const bcrypt = require('bcryptjs');

async function testBcrypt() {
  const password = '123456789aA@'; 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log('Hashed Password:', hashedPassword);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Do they match?', isMatch);
}

testBcrypt();
