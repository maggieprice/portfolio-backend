
exports.up = function(knex) {
    return knex.schema.createTable('emails', emails => {
        emails.increments();
    
        emails
          .string('name', 255)
          .notNullable()
        emails.string('email').notNullable();
        emails.string('message').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('emails');
};
