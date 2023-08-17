const knex = require("../db/connection");
const tableName = "dispatchers";

function read(dispatcherId) {
	return knex(tableName).where({ dispatcher_id: dispatcherId }).first();
}

function list() {
	return knex("dispatchers");
}

function create(dispatcher) {
	return knex(tableName)
		.insert(dispatcher, "*")
		.then((createdRecords) => createdRecords[0]);
}

function update(dispatcher) {
	return knex(tableName)
		.select("*")
		.where({ dispatcher_id: dispatcher.dispatcher_id })
		.update(dispatcher, "*");
}

function destroy(dispatcherId) {
	return knex(tableName).where({ dispatcher_id: dispatcherId }).del();
}

module.exports = {
	read,
	list,
	create,
	update,
	destroy,
};
