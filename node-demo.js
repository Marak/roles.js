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
  //roles.inheritRolesFromGroup('Fly Fishers', 'Guests');
  
  
  // now that we have loaded some roles and created some new ones, lets try some test cases
  
  // first, lets see all the current groups and their roles
  var theGroups = roles.getGroups();
  //sys.puts(JSON.stringify(theGroups, true, 1));

  // okay that was interesting, but kinda hard to read. lets try a basic permissions check
  
  
  if("Marak".can('edit a resource')){
    sys.puts('Marak can "edit a resource" because he is in the "Administrators" group, which inherits the "Moderators" group, which can edit resources.')
  }
  
  var someuser = "Bob";
  
  if(someuser.can('edit a resource')){
    // i don't think so Bob!
  }
  else{
    sys.puts('Bob cannot "edit a resource" because he is not part of any group that has this role.')
  }
  
  
  
  
  sys.puts();
  
  
});

