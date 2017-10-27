
exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", function(table){
    table.increments();
    table.string("title").notNullable().defaultTo("");
    table.string("post").notNullable().defaultTo("");
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("cascade").index();
    table.timestamps(true,true);
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts");
};
