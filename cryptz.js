const Cryptz = require("./lib/cryptz/Cryptz");

const cryptz = new Cryptz({
  password: "This is super secret",
});

const subject = "abc";
console.log("Encrypting string: " + subject);
const encrypted = cryptz.enc(subject);
console.log(encrypted);

console.log("----------------------------");
console.log("Decrypting the subject");
console.log(cryptz.dec(encrypted));
