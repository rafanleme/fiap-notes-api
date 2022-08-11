const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

const { notes, idGenerator } = require("./notes");

app.get("/notes", (req, res) => {
  setTimeout(() => {
    res.send(notes);
  }, 1000);
});

app.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  if (!note)
    return res.status(404).send({ erro: "Nota não encontrada" });

    setTimeout(() => {
      res.status(200).send(note);
    }, 1000);
});

app.post("/notes", (req, res) => {
  const { text, urgent } = req.body;

  if (!text)
    return res.send({ erro: "O campo text é obrigatório" });

  const id = idGenerator.next().value;

  const note = {
    id,
    date: new Date(),
    urgent,
    text
  };

  notes.push(note);
  
  setTimeout(() => {
    res.send(note);
  }, 800);
})

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  if (!note)
    return res.status(404).send({ erro: "Nota não encontrada" });

  notes.splice(notes.indexOf(note), 1);

  setTimeout(() => {
    res.status(204).send();
  }, 800);
});

app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { text, urgent } = req.body;

  if (!text)
    return res.send({ erro: "O campo text é obrigatório" });

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  if (!note)
    return res.status(404).send({ erro: "Nota não encontrada" });

  notes.forEach(note => {
    if (note.id == id) {
      note.text = text;
      note.urgent = !!urgent;
    }
  })

  setTimeout(() => {
    res.status(200).send();
  }, 800);
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log("Servidor rodando na porta 3333"))