const Logz = require("./lib/logz/Logz");

const logz = new Logz();

logz.info("This is info");
logz.error("This is error");
logz.debug("This is debug");
logz.warning("This is warning");
logz.docs("This is docs");
logz.stackoverflow("This is stackoverflow");
logz.sponsor("This is sponsor");
logz.label("See");
logz.label("With Json").json({ test: true });
logz.error("Record error").record();
logz.json("abc");
logz
  .json({
    abc: "string",
    iamnull: null,
    iu: undefined,
  })
  .record();

logz.print({
  abc: "string",
  iamnull: null,
  iu: undefined,
});
logz.print("something").record();

logz.now();
