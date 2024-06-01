# wizelib

Libraries for all utilites in node project that usually i need

# Logz

A flexible logging utility for Node.js applications that supports various log levels and custom logging functions.

## Installation

```bash
npm install logz
```

## Usage

### Basic Setup

```javascript
const Logz = require("./lib/logz/Logz");

const logz = new Logz();
```

### Customizing Log File Path and Name

Specify custom paths and file names for log file storage.

```javascript
const logz = new Logz({ file: "application.log", path: "./logs/" });
logz.info("This is an information");

logz.error("Something went wrong").record();
// It would record error log to application.log file in ./logs directory like as defined in the option of constructor on Logz class

logz.error("Database error happen").record("database.txt");
// Now it would store the error in the database.txt file but still in ./logs directory
```

### Logging Levels

Log messages with different severity levels.

```javascript
logz.info("This is an info message");
// : INFO    2024-06-01 12:00:00  This is an info message

logz.error("This is an error message");
// : ERROR   2024-06-01 12:00:00  This is an error message

logz.debug("This is a debug message");
// : DEBUG   2024-06-01 12:00:00  This is a debug message

logz.warning("This is a warning message");
// : WARNING 2024-06-01 12:00:00  This is a warning message

logz.docs("This is a docs message");
// : DOCS    2024-06-01 12:00:00  This is a docs message

logz.stackoverflow("This is a stackoverflow message");
// : STACKOVERFLOW 2024-06-01 12:00:00  This is a stackoverflow message - https://stackoverflow.com/search?q=This%20is%20a%20stackoverflow%20message

logz.sponsor("This is a sponsor message");
// : SPONSOR 2024-06-01 12:00:00  This is a sponsor message
```

### Custom Logger Function

Use a custom logging function with destructuring for type and message.

```javascript
const customLogger = ({ type, message, now }) => {
  console.log(
    `[Custom Logger] ${now(false)} - ${type.toUpperCase()}: ${message}`
  );
};

const logz = new Logz({ logger: customLogger });

logz.info("This will use the custom logger");
// Outputs: [Custom Logger] 2024-06-01 12:00:00 - INFO: This will use the custom logger
```

### Labeling and JSON

Add labels and log JSON objects.

```javascript
logz.label("User Data").json({ name: "John Doe", age: 30 });
// Outputs: > User Data :
// Outputs JSON formatted data
logz.print("This is a simple string").record();
// Outputs: This is a simple string
// Appends the log to the file
```

### Logging to a File

Log messages to a specific file.

```javascript
logz.error("An error occurred").record("error.log");
// Appends the error message to error.log
logz.info("General info message").record("general.log");
// Appends the info message to general.log
```

### Timestamp

Print the current timestamp.

```javascript
logz.now(); // Outputs and returns: 2024-06-01 12:00:00
```

### Tables

Print data as a table.

```javascript
logz.table([
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
]);
// Outputs a table in the console with the data
```

## Examples

### Log to Different Files Based on Error Type

```javascript
logz
  .setType("error")
  .setMessage("A critical error occurred")
  .record("critical_errors.log");
// Appends the message to critical_errors.log
logz.setType("info").setMessage("This is just an info").record("info.log");
// Appends the message to info.log
```

### Chainable API

```javascript
logz.setType("debug").setMessage("Debugging the application").record();
// Appends the debug message to the default log file
logz.label("Test Label").json({ key: "value" }).record();
// Outputs: > Test Label :
// Outputs JSON formatted data
// Appends the JSON data to the default log file
```

### Complete Method Examples

```javascript
logz.info("This is an info message");
// Outputs: : INFO    2024-06-01 12:00:00  This is an info message

logz.error("This is an error message");
// Outputs: : ERROR   2024-06-01 12:00:00  This is an error message

logz.warning("This is a warning message");
// Outputs: : WARNING 2024-06-01 12:00:00  This is a warning message

logz.debug("This is a debug message");
// Outputs: : DEBUG   2024-06-01 12:00:00  This is a debug message

logz.docs("This is a docs message");
// Outputs: : DOCS    2024-06-01 12:00:00  This is a docs message

logz.stackoverflow("This is a stackoverflow message");
// Outputs: : STACKOVERFLOW 2024-06-01 12:00:00  This is a stackoverflow message with a StackOverflow search URL

logz.sponsor("This is a sponsor message");
// Outputs: : SPONSOR 2024-06-01 12:00:00  This is a sponsor message

logz.label("Label Example");
// Outputs: > Label Example :

logz.json({ example: "JSON data" });
// Outputs formatted JSON data

logz.print("This is a display message");
// Outputs: This is a display message

logz.table([
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
]);
// Outputs a table with the data

logz.now();
// Outputs and returns the current timestamp
```

## License

MIT

---
