const jwt = require("jsonwebtoken");
const auth = require("./auth.json");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ erro: "Token não informado" });

  const parts = authHeader.split(" ");

  if (!parts.lenght === 2)
    return res.status(401).send({ erro: "Erro no token" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ erro: "Token mal formatado" });

  try {
    const retorno = jwt.verify(token, auth.secret);

    req.username = retorno.username;
    req.userId = retorno.userId;
  } catch (e) {
    return res.status(401).send({ erro: "Token inválido" });
  }

  return next();
};
