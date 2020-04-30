
exports.up = async function(knex) {
/////////////// ZOOS ///////////////

    await knex.schema.createTable("zoos", (table) => {
        table.increments("id")
        table.text("name").notNullable()
        table.text("address").notNullable().unique()
    })

/////////////// SPECIES ///////////////

    await knex.schema.createTable("species", (table) => {
        table.increments("id")
        table.text("name").notNullable()
    })

/////////////// ANIMALS ///////////////

    await knex.schema.createTable("animals", (table) => {
        table.increments("id")
        table.text("name").notNullable()
        table.integer("species_id").references("id").inTable("species")
    })

/////////////// ZOOS_ANIMALS ///////////////

    await knex.schema.createTable("zoos_animals", (table) => {
        table.integer("zoo_id").references("id").inTable("zoos")
        table.integer("animal_id").references("id").inTable("animals")
        table.date("from_date").defaultTo(knex.raw("current_timestame"))
        table.date("to_date")
        table.primary(["zoo_id", "animal_id"])
    })


};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("zoos_animals")
    await knex.schema.dropTableIfExists("animals")
    await knex.schema.dropTableIfExists("species")
    await knex.schema.dropTableIfExists("zoos")
};
