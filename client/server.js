const cli = require("@angular/cli").default;

cli({
  cliArgs: [
    "serve",
    "--port",
    "2323",
    "-o",
    ...process.argv.slice(2),
  ]
});
