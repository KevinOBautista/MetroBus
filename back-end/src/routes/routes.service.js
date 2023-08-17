const knex = require("../db/connection");
const tableName = "routes";

function read(routeId) {
	return knex(`${tableName} as r`)
		.join("dispatchers as d", "r.dispatcher_id", "d.dispatcher_id")
		.join("vehicles as v", "r.vehicle_id", "v.vehicle_id")
		.join("drivers as d2", "r.driver_id", "d2.driver_id")
		.where({ route_id: routeId })
		.first();
}

function list() {
	return knex("routes");
}

function listWithQuery(date) {
	return knex(`${tableName} as r`)
		.select("*")
		.where({ "r.route_date": date })
		.andWhereNot("status", "finished")
		.orderBy("r.route_time");
}

function create(route) {
	return knex(tableName)
		.insert(route, "*")
		.then((createdRecords) => createdRecords[0]);
}

function update(route) {
	return knex(tableName)
		.select("*")
		.where({ route_id: route.route_id })
		.update(route, "*");
}

function destroy(routeId) {
	return knex(tableName).where({ route_id: routeId }).del();
}

module.exports = {
	read,
	list,
	listWithQuery,
	create,
	update,
	destroy,
};
