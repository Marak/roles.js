var sys = require('sys'),
fs = require('fs'),
roles = require('./lib/roles');


// load up some example roles for basic role management on resources
fs.readFile('./lib/exampleRoles.json', function (err,data) {
  
  // parse the exampleRoles.json file into a JSON object
  roles._data = JSON.parse(data.toString());
  
  // NOTE : it would be pretty easy to create some API syntax sugar in the library
  //        so you can only have one or two calls instead of the following seqeuence
  //        
  //        if anyone wants to create some i'll pull the changes, if not it will be next release or so
  
  // add a user
  roles.addUser('Bob');

  // add a role
  roles.addRole('is allowed to go fly fishing');
  
  // add group
  roles.addGroup('Fly Fishers');

  // add user to group
  roles.addUserToGroup('Bob', 'Fly Fishers');

  // add user to group
  roles.addRoleToGroup('is allowed to go fly fishing', 'Fly Fishers');

  // inherit roles from group, in this case we give "Fly Fishers" all the same roles as "Guests"
  roles.inheritRolesFromGroup('Fly Fishers', 'Guests');
  
  
  //sys.puts('hello');
  //sys.puts(JSON.stringify(roles));

});

