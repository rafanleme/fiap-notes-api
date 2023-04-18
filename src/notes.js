function* generateId() {
  let id = 1;

  while (true) {
    yield id++;
  }
}

let idGenerator = generateId();

const notes = [
  {
    id: idGenerator.next().value,
    text: "Estudar JS Promises",
    date: new Date(),
    userId: 1,
  },
  {
    id: idGenerator.next().value,
    text: "Estudar hooks ReactJS",
    date: new Date(),
    userId: 1,
  },
];

[...Array(50).keys()].forEach((x) =>
  notes.push({
    id: idGenerator.next().value,
    text: x + "- Uma anotação qualquer",
    date: new Date(),
    userId: 1,
  })
);

module.exports = { notes, idGenerator };
