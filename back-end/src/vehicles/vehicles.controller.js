const service = require("./vehicles.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
	"vehicle_plate",
	"vehicle_capacity"
);

function checkCapacity(req, res, next) {
	const { vehicle_capacity } = req.body.data;
	if (typeof vehicle_capacity !== "number") {
		const error = new Error(
			`Vehicle capacity property '${vehicle_capacity}' must be a number.`
		);
		error.status = 400;
		throw error;
	}
	next();
}

async function vehicleExists(req, res, next) {
	const { vehicle_id } = req.params;
	let vehicle = await service.read(vehicle_id);
	if (vehicle) {
		res.locals.vehicle = vehicle;
		return next();
	}
	return next({
		status: 404,
		message: `Vehicle ${vehicle_id} cannot be found.`,
	});
}

async function read(req, res) {
	res.json({ data: res.locals.vehicle });
}

async function list(req, res) {
	const data = await service.list();
	res.json({ data });
}

async function create(req, res) {
	const createdVehicle = await service.create(req.body.data);
	res.status(201).json({ data: createdVehicle });
}

async function update(req, res) {
	const updatedVehicle = {
		...res.locals.vehicle,
		...req.body.data,
	};
	let data = await service.update(updatedVehicle);
	data = data[0];
	res.json({ data });
}

async function destroy(req, res) {
	await service.destroy(res.locals.vehicle.vehicle_id);
	res.sendStatus(204);
}

module.exports = {
	read: [asyncErrorBoundary(vehicleExists), asyncErrorBoundary(read)],
	list: [asyncErrorBoundary(list)],
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(checkCapacity),
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(vehicleExists),
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(checkCapacity),
		asyncErrorBoundary(update),
	],
	delete: [asyncErrorBoundary(vehicleExists), asyncErrorBoundary(destroy)],
};
