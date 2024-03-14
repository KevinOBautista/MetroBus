const knex = require("../db/connection");
const tableName = "customers";

function read(customerId) {
	return knex(tableName).where({ customer_id: customerId }).first();
}

function list() {
	return knex("customers as c");
}

function listRouteCustomers(routeId) {
	return knex(tableName).where({ route_assignment: routeId });
}

function createCustomers(customers) {
	return knex.transaction(async (trx) => {
		try {
			const createdRecords = await trx(tableName).insert(customers, "*");
			console.log("Customers inserted successfully:", createdRecords);
		} catch (error) {
			console.error("Error inserting customers:", error);
			throw error;
		}
	});
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
	listRouteCustomers,
	createCustomers,
};
