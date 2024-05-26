const chalk = require("chalk");

const colorizer = {
  bgColor(type, text) {
    switch (type) {
      case "info":
        return chalk.bgGreenBright.white.bold(text);
      case "error":
        return chalk.bgRed.white.bold(text);
      case "warning":
        return chalk.bgYellow.white.bold(text);
      case "debug":
        return chalk.bgMagentaBright.white.bold(text);
      case "stackoverflow":
        return chalk.bgYellow.white.bold(text);
      case "docs":
        return chalk.bgBlue.white.bold(text);
      case "sponsor":
        return chalk.bgBlueBright.white.bold(text);
      default:
        return chalk.gray(text);
    }
  },
  color(type, text) {
    switch (type) {
      case "info":
        return chalk.greenBright.bold(text);
      case "error":
        return chalk.red.bold(text);
      case "warning":
        return chalk.yellow.bold(text);
      case "debug":
        return chalk.magentaBright.bold(text);
      case "stackoverflow":
        return chalk.white.bold(text);
      case "docs":
        return chalk.blue.bold(text);
      case "sponsor":
        return chalk.blueBright.bold(text);
      default:
        return chalk.gray(text);
    }
  },
  colorizeJson(data) {
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return data;
      }
    }

    const colorize = (value) => {
      if (typeof value === "string") {
        return chalk.green(`"${value}"`);
      } else if (typeof value === "number") {
        return chalk.blueBright(value);
      } else if (typeof value === "boolean") {
        return chalk.magenta(value);
      } else if (value === null) {
        return chalk.gray("null");
      } else if (typeof value === "object") {
        return colorizer.colorizeJson(value);
      }
      return value;
    };

    if (Array.isArray(data)) {
      const items = data.map((item) => colorize(item)).join(", ");
      return `[ ${items} ]`;
    } else {
      const entries = Object.entries(data)
        .map(
          ([key, value]) => `${chalk.yellow(`"${key}"`)}: ${colorize(value)}`
        )
        .join(",\n  ");
      return `{\n  ${entries}\n}`;
    }
  },
};

module.exports = colorizer;
