

# roles.js - a super simple node.js JSON based roles management system

##features

###decoupled roles management
roles.js is not tightly coupled to any authentication system, database, ORM, router, or web framework. this enables you, the developer, to integrate role management into any existing software system with a few simple HTTP calls sending and receiving JSON

###super simple and intuitive API
since roles.js is not coupled to any other systems its API can focus only on the domain problem of roles management. utilizing the node.js <a href = "http://nodejs.org/api.html#http-server-152">http class</a> roles.js exposes robust JSON-RPC api methods. <a href = "#API">read more</a>

### pluggable persistence 
roles.js operates in memory by default, but in most cases the developer will need to store roles data in an actual database. since roles.js exposes a JSON-RPC api you can connect roles.js to your existing system using HTTP calls. also, roles.js  is written in node.js, so it can easily be integrated with a number of node.js persistence layers, such as <a href = "http://github.com/cloudhead/resourcer">resourcer</a>.


#entities

##keys
a key is a unique string. a username or auto-incrementing id are good choices.

      "keys": [
        "Marak",
        "Charlie",
        "Alexis",
        "Isaacs",
        "Guest"
      ]

##roles
roles are an action that a key is capable of performing, such as having the permission to modify resourcers.

      "roles": [
        "can view resource",
        "can edit resource",
        "can add resource",
        "can delete resource"
      ]


##groups
groups are associations of a list of keys to a list of roles. groups can also "inherit" associations from other groups. 

      "groups": {
         "Guests":{
           "keys": ["Guest"],
           "roles": ["can view resources"],
           "inherits": []
         },
         "Moderators":{
           "keys": ["Charlie", "Alexis", "Isaacs"],
           "roles": ["can edit resources", "can add resources"],
           "inherits": ["Guests"]
         },
         "Administrators":{
           "keys": ["Marak"],
           "roles": ["can delete resources"],
           "inherits": ["Moderators"]
         }
       }

##usage

first we are going to set some default role data




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


##faq

**what if i create a circular reference in inheriting roles?**

*you should avoid this, but if you accidentally do, its not that bad. if you create a circular reference in your groups this means that the roles for those group are complete and known. if roles.js encounters a circular reference it will break out after a set number of iterations and return the correct roles.*