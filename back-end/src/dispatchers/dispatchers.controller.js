const service = require("./dispatchers.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
	"dispatcher_name",
	"dispatcher_mobile_number"
);
const validPhone = require("../errors/validPhone");

async function dispatcherExists(req, res, next) {
	const { dispatcher_id } = req.params;
	let dispatcher = await service.read(dispatcher_id);
	if (dispatcher) {
		res.locals.dispatcher = dispatcher;
		return next();
	}
	return next({
		status: 404,
		message: `Dispatcher ${dispatcher_id} cannot be found.`,
	});
}

async function read(req, res) {
	res.json({ data: res.locals.dispatcher });
}

async function list(req, res) {
	const data = await service.list();
	res.json({ data });
}

async function create(req, res) {
	const createdDispatcher = await service.create(req.body.data);
	res.status(201).json({ data: createdDispatcher });
}

async function update(req, res) {
	const updatedDispatcher = {
		...res.locals.dispatcher,
		...req.body.data,
	};
	let data = await service.update(updatedDispatcher);
	data = data[0];
	res.json({ data });
}

async function destroy(req, res) {
	await service.destroy(res.locals.dispatcher.dispatcher_id);
	res.sendStatus(204);
}

module.exports = {
	read: [asyncErrorBoundary(dispatcherExists), asyncErrorBoundary(read)],
	list: [asyncErrorBoundary(list)],
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		validPhone,
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(dispatcherExists),
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(update),
	],
	delete: [asyncErrorBoundary(dispatcherExists), asyncErrorBoundary(destroy)],
};
