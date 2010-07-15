var sys = require('sys'),
fs = require('fs')
roles = require('./lib/roles');

// first we are going to set some default role data
roles.load({
  "keys": [
    "Marak",
    "Charlie",
    "Alexis",
    "Isaacs",
    "Guest"
  ],
  "roles": [
    "view resources",
    "edit resources",
    "add resources",
    "delete resources"
  ],
  "groups": {
    "Guests":{
      "keys": ["Guest"],
      "roles": ["view resources"],
      "inherits": []
    },
    "Moderators":{
      "keys": ["Charlie", "Alexis", "Isaacs"],
      "roles": ["edit resources", "add resources"],
      "inherits": ["Guests"]
    },
    "Administrators":{
      "keys": ["Marak"],
      "roles": ["delete resources"],
      "inherits": ["Moderators"]
      
    }
  }
});

// basic permission checks
if("Marak".can('delete resources')){
  sys.puts('Marak can delete resources'); 
}
return;
if(!"Noob".can('delete resources')){
  sys.puts('Noob cannot delete resources.'); 
}

if(!"Marak".cannot('delete resources')){
  sys.puts('Marak can delete resources.'); 
}

if("Noob".cannot('delete resources')){
  sys.puts('Noob cannot delete resources.'); 
}

// basic group checks
if("Marak".isIn('Administrators')){
  sys.puts('Marak is in Administrators'); 
}

if(!"Marak".isntIn('Administrators')){
  sys.puts('Marak is in Administrators'); 
}

if(!"Noob".isIn('Administrators')){
  sys.puts('Noob is not in Administrators'); 
}

if("Noob".isntIn('Administrators')){
  sys.puts('Noob is not in Administrators'); 
}

return;




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



var someuser = "Bob";
if(!someuser.inGroup("Administrators")){
  sys.puts(someuser + ' is not in the "Administrators" group.')
}

if(someuser.can('edit a resource')){
  // i don't think so Bob!
}
else{
  sys.puts('"Bob" cannot "edit a resource" because he is not part of any group that has this role.')
}

if("Alexis".can("add a resource")) {
  sys.puts('"Alexis" can "add a resource" since he is the "Moderators" group');
}

