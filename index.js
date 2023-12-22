// const express = require("express");

// import { getNotes, getNote, createNote } from "./database.js";
// const { getNotes, getNote, createNote } = require("./database.js");
import express from "express";

import { getNotes, getNote, createNote, deleteNote } from "./database.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(201).send(note);
});

app.get("/notes/remove/:id", async (req, res) => {
  const id = req.params.id;
  const note = await deleteNote(id);
  console.log(note);
  res.status(201).send(note);
});
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedNote = await deleteNote(id);

    if (deletedNote) {
      res.send({ success: true, message: "Note deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "Note not found" });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 8080");
});
