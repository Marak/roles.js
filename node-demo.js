var sys = require('sys'),
fs = require('fs'),
roles = require('./lib/roles');


fs.readFile('./lib/exampleRoles.json', function (err,data) {
  
  roles._data = JSON.parse(data.toString());
  
  // add a User
  roles.addUser('Bob');

  // add a User
  roles.addRole('is allowed to go fly fishing');
  

  //sys.puts('hello');
  //sys.puts(JSON.stringify(roles));

});

