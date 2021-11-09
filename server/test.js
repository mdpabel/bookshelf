var bcrypt = require("bcrypt");

async function test() {
  const hashed = await bcrypt.hash("test@gmail.com", 8);
  const compared = await bcrypt.compare("test@gmail.com", hashed);
  console.log(compared, hashed);
}

test();

// $2b$08$2avZhYl3b./Rmm0a4CwjE.ScgQkq/.eyqSz.VThTcr5zLY2UyFfJi
// $2b$08$2avZhYl3b./Rmm0a4CwjE.ScgQkq/.eyqSz.VThTcr5zLY2UyFfJi
