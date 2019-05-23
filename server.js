const express = require("express");
const server = express();
const Accounts = require("./data/accounts-model");

// your code here
server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const accounts = await Accounts.find(req.params.id);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the  accounts"
    });
  }
});

server.get("/:id", validateActionId, async (req, res) => {
  try {
    const account = await Accounts.findById(req.params.id);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the  accounts"
    });
  }
});

server.post("/", async (req, res) => {
  try {
    const newAccount = await Accounts.add(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({
      message: "Error posting the accounts"
    });
  }
});

server.put("/:id", validateActionId, async (req, res) => {
  try {
    const count = await Accounts.update(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({
      message: "Error updating the accounts"
    });
  }
});

server.delete("/:id", validateActionId, async (req, res) => {
  try {
    const count = await Accounts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The account has been removed" });
    } else {
      res.status(404).json({ message: "The account could not be found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

async function validateActionId(req, res, next) {
  try {
    const account = await Accounts.findById(req.params.id);
    if (!account || Object.keys(account).length < 1) {
      res.status(404).json({ message: `Account not Found Invalid ID` });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to process request` });
  }
}

module.exports = server;