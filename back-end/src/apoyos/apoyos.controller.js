const service = require("./apoyos.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("apoyo_name", "price");

function checkPrice(req, res, next) {
	const { price } = req.body.data;
	if (typeof price !== "number") {
		const error = new Error(`Price property '${price}' must be a number.`);
		error.status = 400;
		throw error;
	}
	next();
}

async function apoyoExists(req, res, next) {
	const { apoyo_id } = req.params;
	let apoyo = await service.read(apoyo_id);
	if (apoyo) {
		res.locals.apoyo = apoyo;
		return next();
	}
	return next({
		status: 404,
		message: `Apoyo ${apoyo_id} cannot be found.`,
	});
}

async function read(req, res) {
	res.json({ data: res.locals.apoyo });
}

async function list(req, res) {
	const data = await service.list();
	res.json({ data });
}

async function create(req, res) {
	const createdApoyo = await service.create(req.body.data);
	res.status(201).json({ data: createdApoyo });
}

async function update(req, res) {
	const updatedApoyo = {
		...res.locals.apoyo,
		...req.body.data,
	};
	let data = await service.update(updatedApoyo);
	data = data[0];
	res.json({ data });
}

async function destroy(req, res) {
	await service.destroy(res.locals.apoyo.apoyo_id);
	res.sendStatus(204);
}

module.exports = {
	read: [asyncErrorBoundary(apoyoExists), asyncErrorBoundary(read)],
	list: [asyncErrorBoundary(list)],
	create: [
		asyncErrorBoundary(hasRequiredProperties),
		checkPrice,
		asyncErrorBoundary(create),
	],
	update: [
		asyncErrorBoundary(apoyoExists),
		asyncErrorBoundary(hasRequiredProperties),
		asyncErrorBoundary(update),
	],
	delete: [asyncErrorBoundary(apoyoExists), asyncErrorBoundary(destroy)],
};
