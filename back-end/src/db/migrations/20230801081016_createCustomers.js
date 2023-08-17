/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("customers", (table) => {
		table.increments("customer_id").primary();
		table.string("customer_name").notNullable();
		table.string("customer_mobile_number").notNullable();
		table.string("bos_address").nullable();
		table.string("ny_address").nullable();
		table.string("customer_status").defaultTo("positive").notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("customers");
};
