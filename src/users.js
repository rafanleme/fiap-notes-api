function* generateId() {
  let id = 1;

  while (true) {
    yield id++;
  }
}

let idGeneratorUsers = generateId();

const users = [
  {
    id: idGeneratorUsers.next().value,
    username: "main-user",
    password: "1234"
  }
];

module.exports = { users, idGeneratorUsers }