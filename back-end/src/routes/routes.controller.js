const service = require("./routes.service");
const driversService = require("../drivers/drivers.service");
const dispatcherService = require("../dispatchers/dispatchers.service");
const vehicleService = require("../vehicles/vehicles.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties([
	"route_name",
	"route_date",
	"route_time",
	"dispatcher_id",
	"vehicle_id",
	"driver_id",
]);

async function statusVal(req, res, next) {
	const { route_status } = req.body.data;
	if (
		route_status === "positive" ||
		route_status === "negative" ||
		route_status === "finished"
	) {
		next();
	} else {
		const error = new Error(`Route status '${route_status}' is not allowed`);
		error.status = 400;
		throw error;
	}
}

async function routeExists(req, res, next) {
	const { route_id } = req.params;
	let route = await service.read(route_id);
	if (route) {
		res.locals.route = route;
		return next();
	}
	return next({
		status: 404,
		message: `Route ${route_id} cannot be found.`,
	});
}

async function workersExists(req, res, next) {
	const { dispatcher_id, vehicle_id, driver_id } = req.body.data;
	const driver = await driversService.read(driver_id);
	const dispatcher = await dispatcherService.read(dispatcher_id);
	const vehicle = await vehicleService.read(vehicle_id);
	if (driver && dispatcher && vehicle) {
		res.locals.driver = driver;
		res.locals.dispatcher = dispatcher;
		res.locals.vehicle = vehicle;
		return next();
	} else if (!driver) {
		return next({
			status: 404,
			message: `Driver ${driver_id} cannot be found.`,
		});
	} else if (!dispatcher) {
		return next({
			status: 404,
			message: `Dispatcher ${dispatcher_id} cannot be found.`,
		});
	} else {
		return next({
			status: 404,
			message: `Vehicle ${vehicle_id} cannot be found.`,
		});
	}
}

async function read(req, res) {
	res.json({ data: res.locals.route });
}

async function list(req, res) {
	if (req.query.date) {
		const data = await service.listWithQuery(req.query.date);
		res.json({ data });
	} else {
		const data = await service.list();
		res.json({ data });
	}
}

async function create(req, res) {
	const createdRoute = await service.create(req.body.data);
	res.status(201).json({ data: createdRoute });
}

async function update(req, res) {
	const updatedRoute = {
		...res.locals.route,
		...req.body.data,
	};
	let data = await service.update(updatedRoute);
	data = data[0];
	res.json({ data });
}

async function destroy(req, res) {
	await service.destroy(res.locals.route.route_id);
	res.sendStatus(204);
}

module.exports = {
	read: [asyncErrorBoundary(routeExists), asyncErrorBoundary(read)],
	list: [asyncErrorBoundary(list)],
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(workersExists),
		statusVal,
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(routeExists),
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(workersExists),
		asyncErrorBoundary(update),
	],
	delete: [asyncErrorBoundary(routeExists), asyncErrorBoundary(destroy)],
};
