
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", function(table){
    table.increments();
    table.string("comment").notNullable().defaultTo("");
    table.integer("post_id").notNullable().references("id").inTable("posts").onDelete("cascade").index();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("cascade").index();
    table.timestamps(true,true);
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
