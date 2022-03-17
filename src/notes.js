function* generateId() {
  let id = 1;

  while (true) {
    yield id++;
  }
}

let idGenerator = generateId();

const notes = [];

module.exports = { notes, idGenerator }