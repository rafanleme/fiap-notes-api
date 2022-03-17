const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

const { notes, idGenerator } = require("./notes");

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  if (!note)
    return res.status(404).send({ erro: "Nota não encontrada" });

  res.status(200).send(note);
});

app.post("/notes", (req, res) => {
  const { text } = req.body;

  if (!text)
    return res.send({ erro: "O campo text é obrigatório" });

  const id = idGenerator.next().value;

  const note = {
    id,
    date: new Date(),
    text
  };

  notes.push(note);

  res.send(note);
})

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  if (!note)
    return res.status(404).send({ erro: "Nota não encontrada" });

  notes.splice(notes.indexOf(note), 1);

  res.status(204).send();
});

app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text)
    return res.send({ erro: "O campo text é obrigatório" });

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  console.log(note)

  if (!note)
    return res.status(404).send({ erro: "Nota não encontrada" });

  notes.forEach(note => {
    if (note.id == id) {
      note.text = text;
    }
  })

  res.status(200).send();
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log("Servidor rodando na porta 3333"))