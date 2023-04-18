const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const { secret } = require("./auth.json");
const authMidd = require("./authMid");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const { notes, idGenerator } = require("./notes");
const { users, idGeneratorUsers } = require("./users");

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send({ erro: "Os campos username e password são obrigatórios" });

  const user = users.find(user => user.username === username && user.password === password);

  if (!user)
    return res.status(401).send({ erro: "Nome de usuários e/ou senha inválidos" });

  res.send({
    token: jwt.sign({ userId: user.id, username }, secret)
  });

});


app.post("/register", (req, res) => {
  const { username, password } = req.body;

  console.log(password)

  if (!username || !password)
    return res.status(400).send({ erro: "Os campos username e password são obrigatórios" });

  const user = users.find(user => user.username === username);

  if (user)
    return res.status(400).send({ erro: "Usuário já existente" });

  const id = idGeneratorUsers.next().value;

  users.push({
    id,
    username,
    password
  });

  res.status(200).send({
    token: jwt.sign({ userId: id, username }, secret)
  });
});

app.use(authMidd);

app.get("/notes", (req, res) => {
  const { userId } = req;

  setTimeout(() => {
    res.send(notes.filter(note => note.userId === userId));
  }, 1000);
});

app.get("/notes:paginated", (req, res) => {
  const { userId } = req;
  const { page = 1, pageSize = 10 } = req.query;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  setTimeout(() => {
    const filteredNotes = notes.filter(note => note.userId === userId);
    const paginatedNotes = filteredNotes.slice(startIndex, endIndex);
    const totalItems = filteredNotes.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = page;
    res.send({
      currentPage,
      totalPages,
      totalItems,
      notes: paginatedNotes,
    });
  }, 1000);
});

app.get("/notes/:id", (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  if (!note || note.userId !== userId)
    return res.status(404).send({ erro: "Nota não encontrada" });

  setTimeout(() => {
    res.status(200).send(note);
  }, 600);
});

app.post("/notes", (req, res) => {
  const { userId } = req;
  const { text, urgent } = req.body;

  if (!text)
    return res.send({ erro: "O campo text é obrigatório" });

  const id = idGenerator.next().value;

  const note = {
    id,
    date: new Date(),
    urgent,
    text,
    userId
  };

  notes.push(note);

  setTimeout(() => {
    res.send(note);
  }, 800);
})

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  if (!note || note.userId !== userId)
    return res.status(404).send({ erro: "Nota não encontrada" });

  notes.splice(notes.indexOf(note), 1);

  setTimeout(() => {
    res.status(204).send();
  }, 1000);

});

app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { text, urgent } = req.body;
  const { userId } = req;

  if (!text)
    return res.send({ erro: "O campo text é obrigatório" });

  if (!id)
    return res.send({ erro: "Id obrigatório" });

  const note = notes.find(note => note.id == id);

  if (!note || note.userId !== userId)
    return res.status(404).send({ erro: "Nota não encontrada" });

  notes.forEach(note => {
    if (note.id == id) {
      note.text = text;
      note.urgent = !!urgent;
    }
  })

  setTimeout(() => {
    res.status(200).send();
  }, 800)
})




const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log("Servidor rodando na porta 3333"))