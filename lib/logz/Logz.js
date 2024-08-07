const fs = require("fs");
const { bgColor, color, colorizeJson, colorize } = require("./colorizer");

class Logz {
  constructor({ file = "log.txt", path = "./", logger = null } = {}) {
    this.filename = file;
    this.path = path;
    if (logger !== null && typeof logger !== "function")
      throw new Error("logger must be null or callback function");
    this.logger = logger;
    this.message = "";
    this.type = "";
  }

  now(display = true) {
    let timestamp = new Date().toLocaleString();
    timestamp = timestamp.replace(/\//g, "-").replace(/\./g, ":");
    if (display) {
      console.log(colorize(timestamp));
    }
    return timestamp;
  }

  setType(type = "info") {
    this.type = type;
    return this;
  }

  setMessage(message = "") {
    this.message = message;
    return this;
  }

  record(file = this.filename) {
    let logFile = `${this.path}${file}`;
    let data = `${this.now(false)} - ${this.type} - ${this.message}\n`;
    fs.appendFile(logFile, data, (err) => {
      if (err) this.error(err);
    });
  }

  line() {
    console.log("");
  }

  logging(type, message) {
    this.message = message;
    this.type = type;
    if (this.logger == null) {
      console.log(this.formatMessage(type, message));
    } else {
      this.logger(this);
    }
    return this;
  }

  formatMessage(type, message) {
    const timestamp = ` ${this.now(false)} `;
    const total = 20;
    let label = ` |: ${type.toUpperCase()}`;
    label += " ".repeat(total - label.length);
    let styledType = bgColor(this.type, label);

    if (this.type == "stackoverflow") {
      message =
        `${message} - https://stackoverflow.com/search?q=` +
        message.replace(/ /g, "%20");
    }

    return `${styledType}${timestamp}${bgColor(this.type, " ")} ${color(
      this.type,
      message
    )}`;
  }

  info(message) {
    return this.logging("info", message);
  }

  error(message) {
    return this.logging("error", message);
  }

  warning(message) {
    return this.logging("warning", message);
  }

  debug(message) {
    return this.logging("debug", message);
  }

  stackoverflow(message) {
    return this.logging("stackoverflow", message);
  }

  docs(message) {
    return this.logging("docs", message);
  }

  sponsor(message) {
    return this.logging("sponsor", message);
  }

  label(data = "data") {
    console.log(`> ${data} : `);
    return this;
  }

  json(data, type = "json") {
    this.type = type;
    if (["object", "function", "Symbol"].includes(typeof data)) {
      if (typeof data == "object") {
        this.message = JSON.stringify(data, "", 4);
      }
      const formattedData = colorizeJson(data);
      console.log(formattedData);
      return this;
    } else {
      this.message = data;
      console.log(colorize(data));
      return this;
    }
  }

  print(message) {
    return this.json(message, "display");
  }

  table(data) {
    console.table(data);
    this.type = "table";
    if (typeof data === "object") {
      this.message = JSON.stringify(data, "", 4);
    } else {
      this.message = data;
    }
    return this;
  }
}

module.exports = Logz;
