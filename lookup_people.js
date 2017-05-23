const pg = require("pg");
const moment = require("moment");
const settings = require("./settings"); // settings.json

// initiate a new client
// client will read connection information from the same environment variables
// used by postgres cli tools
const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

let input = process.argv[2];
input = input.charAt(0).toUpperCase() + input.slice(1);

// connect to database
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching...');
  client.query(`select *
    from famous_people
    where last_name = $1 OR
    first_name = $1`, [input], function(err, results) {
    if (err) {
      throw err;
    }
    outputData(input, results);
  });
});

function outputData(input, results) {
  console.log(`Found ${results.rows.length} person(s) by the name '${input}':`);
  results.rows.forEach((row) => {
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate.getFullYear()}-${row.birthdate.getMonth()}-${row.birthdate.getDate()}'`);
  });
}
