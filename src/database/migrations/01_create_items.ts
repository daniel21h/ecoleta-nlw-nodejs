import Knex from "knex";

// Make changes to the table
export async function up(knex: Knex) {
  // Create table
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

export async function down(knex: Knex) {
  // Go back (Delete the table)
  return knex.schema.dropTable('items');
}