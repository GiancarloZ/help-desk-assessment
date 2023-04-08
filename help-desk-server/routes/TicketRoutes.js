const express = require("express");

const Ticket = require("../models/Ticket");

module.exports = (app) => {
  let tickets = [];

  app.post("/submit-ticket", (req, res) => {
    const newId = Date.now().toString();
    console.log(req, "req");
    const newTicket = new Ticket(
      newId,
      req.body.name,
      req.body.email,
      req.body.description,
      "new"
    );

    tickets[newId] = newTicket;
    console.log(
      `Would normally send email to staff here with body: A new help desk ticket has been submitted; ${newTicket} `
    );
    res.status(201).json(newTicket);
  });

  app.get("/tickets", (req, res) => {
    res.json(Object.values(tickets));
  });

  app.put("/tickets/:id", (req, res) => {
    const { id } = req.params;

    if (!tickets[id]) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    tickets[id] = {
      ...tickets[id],
      status: req.body.status || tickets[id].status,
      message: req.body.message || tickets[id].message,
    };

    console.log(
      `Would normally send email to customer here with body: A staff member has updated your ticket; Status: ${tickets[id].status}, Response: ${tickets[id].message} `
    );
    res.json(tickets[id]);
  });
};
