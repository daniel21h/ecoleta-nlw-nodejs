import Knex from "knex";

// Make changes to the table
export async function up(knex: Knex) {
  // Create table
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary();

    // Create foreign key
    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points')
    ;

    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('points')
    ;
  })
}

export async function down(knex: Knex) {
  // Go back (Delete the table)
  return knex.schema.dropTable('point_items');
}