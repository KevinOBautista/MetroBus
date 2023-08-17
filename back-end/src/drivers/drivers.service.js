const knex = require("../db/connection");
const tableName = "drivers";

function read(driverId) {
	return knex(tableName).where({ driver_id: driverId }).first();
}

function list() {
	return knex("drivers");
}

function create(driver) {
	return knex(tableName)
		.insert(driver, "*")
		.then((createdRecords) => createdRecords[0]);
}

function update(driver) {
	return knex(tableName)
		.select("*")
		.where({ driver_id: driver.driver_id })
		.update(driver, "*");
}

function destroy(driverId) {
	return knex(tableName).where({ driver_id: driverId }).del();
}

module.exports = {
	read,
	list,
	create,
	update,
	destroy,
};
