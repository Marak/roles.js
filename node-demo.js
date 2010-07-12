var sys = require('sys'),
fs = require('fs'),
roles = require('./lib/roles');


// load up some example roles for basic role management on resources
fs.readFile('./lib/exampleRoles.json', function (err,data) {
  
  roles._data = JSON.parse(data.toString());
  
  // add a user
  roles.addUser('Bob');

  // add a role
  roles.addRole('is allowed to go fly fishing');
  
  // add group
  roles.addGroup('Fly Fishers');

  //sys.puts('hello');
  //sys.puts(JSON.stringify(roles));

});

