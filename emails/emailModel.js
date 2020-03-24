const db = require("../database/dbConfig");

module.exports = {
  find,
  findById,
  add,
  
};

function find() {
  return db("emails");
}

function findById(id) {
  return db("emails")
    .where({ id })
    .first();
} 

function add(email) {
  return db("emails").insert(email, "id");
}

