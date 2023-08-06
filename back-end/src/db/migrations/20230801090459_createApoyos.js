/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("apoyos", (table) => {
		table.increments("apoyo_id").primary();
		table.string("apoyo_name").notNullable();
		table.integer("price").unsigned().notNullable();
		table.string("apoyo_mobile_number").notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("apoyos");
};
