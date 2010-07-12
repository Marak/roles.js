# roles.js - a super simple JSON based roles management blackbox

##features

###decoupled roles management
roles.js is not tightly coupled to any authentication system, database, ORM, router, or web framework. this allows you as a developer to integrate roles managment into any existing system

###super simple and intuitive API
since roles.js is not coupled to any other systems its API focus only on the domain problem of roles management

### pluggable persistence 
roles.js operates in memory by default, but optionally you can use an ORM such as resourcer to persist your users, groups, and roles to a database 


##entities 

###users
users is an array of unique usernames. the names can be numbers or UUIDs if you please, as long as they are unique.

###roles
roles are simply roles that a user might be capable of doing

###groups
groups are groups of users and roles. a list of roles is associated with a list of users. groups can also "inherit" roles from other groups creating
a hierarchical structure of groups, users, and roles. 

##usage

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

            // now that we have loaded some roles and created some new ones, lets try some test cases
  
            // first, lets see all the current groups and their roles
            var theGroups = roles.getGroups();
            sys.puts(JSON.stringify(theGroups, true, 1));
            // okay that was interesting, but kinda hard to read. lets try a basic permissions check
  
  
            if("Marak".can('edit a resource')){
              sys.puts('"Marak" can "edit a resource" because he is in the "Administrators" group, which inherits the "Moderators" group, which can edit resources.')
            }
  
            if("Marak".inGroup("Administrators")){
              sys.puts('"Marak" is in the "Administrators" group.'); // this is expected
            }
  
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
  
          });
