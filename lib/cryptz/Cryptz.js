import crypto from "crypto";

class Cryptz {
  constructor({ algorithm = "aes-256-ctr", password = "YOUR-SECRET" } = {}) {
    this.algorithm = algorithm;
    this.password = password;
  }

  enc = (text) => {
    var cipher = crypto.createCipher(this.algorithm, this.password);
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  };

  dec = (text) => {
    var decipher = crypto.createDecipher(this.algorithm, this.password);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  };
}

export default Cryptz;
