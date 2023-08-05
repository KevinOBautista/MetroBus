const knex = require("../db/connection");
const tableName = "apoyos";

function read(apoyoId) {
	return knex(tableName).where({ apoyo_id: apoyoId }).first();
}

function list() {
	return knex("apoyos as a").orderBy("a.price");
}

function create(apoyo) {
	return knex(tableName)
		.insert(apoyo, "*")
		.then((createdRecords) => createdRecords[0]);
}

function update(apoyo) {
	return knex(tableName)
		.select("*")
		.where({ apoyo_id: apoyo.apoyo_id })
		.update(apoyo, "*");
}

function destroy(apoyoId) {
	return knex(tableName).where({ apoyo_id: apoyoId }).del();
}

module.exports = {
	read,
	list,
	create,
	update,
	destroy,
};
