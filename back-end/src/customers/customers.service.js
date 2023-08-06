const knex = require("../db/connection");
const tableName = "customers";

function read(customerId) {
	return knex(tableName).where({ customer_id: customerId }).first();
}

function list() {
	return knex("customers as c");
}

function create(customer) {
	return knex(tableName)
		.insert(customer, "*")
		.then((createdRecords) => createdRecords[0]);
}

function update(customer) {
	return knex(tableName)
		.select("*")
		.where({ customer_id: customer.customer_id })
		.update(customer, "*");
}

module.exports = {
	read,
	list,
	create,
	update,
};
