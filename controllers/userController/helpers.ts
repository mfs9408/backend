const jwt = require("jsonwebtoken");

const generateJwt = (
  id: number,
  email: string,
  nickname: string,
  role: string
): string =>
  jwt.sign({ id, email, nickname, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "24h",
  });

module.exports = generateJwt;
