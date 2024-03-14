const service = require("./customers.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
	"customer_name",
	"customer_mobile_number"
);
const validPhone = require("../errors/validPhone");

const createMiddlewares = [
	asyncErrorBoundary(hasRequiredProperties),
	asyncErrorBoundary(hasAddress),
	asyncErrorBoundary(validPhone),
];

async function customerExists(req, res, next) {
	const { customer_id } = req.params;
	const customer = await service.read(customer_id);
	if (customer) {
		res.locals.customer = customer;
		return next();
	}
	return next({
		status: 404,
		message: `customer ${customer_id} cannot be found.`,
	});
}

/**
 * A middleware function that validates that req.body.data has either a NY or BOS address.
 */
function hasAddress(req, res, next) {
	const { data } = req.body;

	if (!data.ny_address && !data.bos_address) {
		const error = new Error(
			`A 'ny_address' or 'bos_address' property is required.`
		);
		error.status = 400;
		throw error;
	}
	next();
}

function statusCheck(req, res, next) {
	const { customer_status } = req.body.data;
	if (
		customer_status.toLowerCase() == "negative" ||
		customer_status.toLowerCase() == "positive"
	) {
		next();
	} else {
		const error = new Error(`Status must be positive or negative`);
		error.status = 400;
		throw error;
	}
}

async function createMiddlewareChecker(req, res, next) {
	const customers = req.body.data;
	if (Array.isArray(customers)) {
		for (const customer of customers) {
			for (const middleware of createMiddlewares) {
				await middleware({ body: { data: customer } }, res, next);
			}
		}
	} else {
		for (const middleware of createMiddlewares) {
			await middleware(req, res, next);
		}
	}
}

async function read(req, res) {
	res.json({ data: res.locals.customer });
}

async function list(req, res) {
	if (req.query.route_id) {
		const data = await service.listRouteCustomers(req.query.route_id);
		res.json({ data });
	} else {
		const data = await service.list();
		res.json({ data });
	}
}

async function create(req, res) {
	if (Array.isArray(req.body.data)) {
		const createdCustomers = await service.createCustomers(req.body.data);
		res.status(201).json({ data: createdCustomers });
	} else {
		const createdCustomer = await service.create(req.body.data);
		res.status(201).json({ data: createdCustomer });
	}
}

async function update(req, res) {
	const updatedCustomer = {
		...res.locals.customer,
		...req.body.data,
	};
	let data = await service.update(updatedCustomer);
	data = data[0];
	res.json({ data });
}

module.exports = {
	read: [asyncErrorBoundary(customerExists), asyncErrorBoundary(read)],
	list: [asyncErrorBoundary(list)],
	create: [
		// asyncErrorBoundary(hasRequiredProperties),
		// asyncErrorBoundary(hasAddress),
		// asyncErrorBoundary(validPhone),
		// checkIfArray,
		asyncErrorBoundary(createMiddlewareChecker),
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(customerExists),
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(validPhone),
		asyncErrorBoundary(statusCheck),
		asyncErrorBoundary(hasAddress),
		asyncErrorBoundary(update),
	],
};
