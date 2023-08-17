/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable("customers", (table) => {
		table
			.integer("route_assignment")
			.nullable()
			.references("route_id")
			.inTable("routes");
		table.integer("rescue").nullable().references("apoyo_id").inTable("apoyos");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.table("customers", (table) => {
		table.dropColumn("route_assignment");
		table.dropColumn("rescue");
	});
};
