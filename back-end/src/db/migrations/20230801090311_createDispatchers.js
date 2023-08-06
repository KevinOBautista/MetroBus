/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("dispatchers", (table) => {
		table.increments("dispatcher_id").primary();
		table.string("dispatcher_name").notNullable();
		table.string("dispatcher_mobile_number").notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("dispatchers");
};
