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

let firstName = process.argv[2];
// Convert firstName into a string with first letter capitalized
firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

let lastName = process.argv[3];
// Convert lastName into a string with first letter capitalized
lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

let birthDate = process.argv[4];

// console.log(process.argv.slice(2));

knex.insert({
    first_name: `${firstName}`,
    last_name: `${lastName}`,
    birthdate: `${birthDate}`
  })
  .into('famous_people')
  .catch(function(err) {
    if (err) {
      console.log(err);
    }
  }).finally(function() {
    process.exit();
  });
