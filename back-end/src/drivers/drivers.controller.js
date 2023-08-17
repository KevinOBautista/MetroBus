const service = require("./drivers.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
	"driver_name",
	"driver_mobile_number"
);
const validPhone = require("../errors/validPhone");

async function driverExists(req, res, next) {
	const { driver_id } = req.params;
	let driver = await service.read(driver_id);
	if (driver) {
		res.locals.driver = driver;
		return next();
	}
	return next({
		status: 404,
		message: `driver ${driver_id} cannot be found.`,
	});
}

async function read(req, res) {
	res.json({ data: res.locals.driver });
}

async function list(req, res) {
	const data = await service.list();
	res.json({ data });
}

async function create(req, res) {
	const createdDriver = await service.create(req.body.data);
	res.status(201).json({ data: createdDriver });
}

async function update(req, res) {
	const updatedDriver = {
		...res.locals.driver,
		...req.body.data,
	};
	let data = await service.update(updatedDriver);
	data = data[0];
	res.json({ data });
}

async function destroy(req, res) {
	await service.destroy(res.locals.driver.driver_id);
	res.sendStatus(204);
}

module.exports = {
	read: [asyncErrorBoundary(driverExists), asyncErrorBoundary(read)],
	list: [asyncErrorBoundary(list)],
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		validPhone,
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(driverExists),
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(update),
	],
	delete: [asyncErrorBoundary(driverExists), asyncErrorBoundary(destroy)],
};
