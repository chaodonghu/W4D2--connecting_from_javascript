const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

let input = process.argv[2];
input = input.charAt(0).toUpperCase() + input.slice(1);

function outputData(input) {
  console.log("Searching...");
  knex.select()
    .from('famous_people')
    .where('first_name', input)
    .orWhere('last_name', input)
    .then(function(rows) {
      console.log(`Found ${rows.length} person(s) by name ` + input);
      rows.forEach((row) => {
        console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate.getFullYear()}-${row.birthdate.getMonth()+1}-${row.birthdate.getDate()}'`);
      });
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
}

outputData(input);
