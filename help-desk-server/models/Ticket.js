class Ticket {
  constructor(id, name, email, description, status = "new", message = "") {
    this.id = id;
    this.name = name;
    this.email = email;
    this.description = description;
    this.status = status;
    this.message = message;
  }
}

module.exports = Ticket;
