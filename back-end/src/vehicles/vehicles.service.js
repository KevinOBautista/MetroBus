const knex = require("../db/connection");
const tableName = "vehicles";

function read(vehicleId) {
	return knex(tableName).where({ vehicle_id: vehicleId }).first();
}

function list() {
	return knex("vehicles");
}

function create(vehicle) {
	return knex(tableName)
		.insert(vehicle, "*")
		.then((createdRecords) => createdRecords[0]);
}

function update(vehicle) {
	return knex(tableName)
		.select("*")
		.where({ vehicle_id: vehicle.vehicle_id })
		.update(vehicle, "*");
}

function destroy(vehicleId) {
	return knex(tableName).where({ vehicle_id: vehicleId }).del();
}

module.exports = {
	read,
	list,
	create,
	update,
	destroy,
};
