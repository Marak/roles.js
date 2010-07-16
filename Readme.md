#(unreleased and unfinished, donut use)

# roles.js - a super simple node.js JSON based roles management system

##features

###decoupled roles management
roles.js is not tightly coupled to any authentication system, database, ORM, router, or web framework. this enables you, the developer, to integrate role management into any existing software system with a few simple api calls

###super simple and intuitive API
since roles.js is not coupled to any other systems its API can focus only on the domain problem of roles management. utilizing the node.js <a href = "http://nodejs.org/api.html#http-server-152">http class</a>, roles.js exposes robust JSON-RPC api methods. <a href = "#API">read more</a>

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
roles are an action that a key is capable of performing, such as having the permission to modify resources. roles can be ANY arbitrary string, 
remember a "role" doesn't actually do anything, its just a label.

      "roles": [
        "view resources",
        "edit resources",
        "add resources",
        "delete resources"
      ]


##groups
groups are associations of a list of keys to a list of roles. groups can also "inherit" associations from other groups. 

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

in this example: 

"Administrators" inherit the roles of "Moderators" and "Guests"
"Moderators" have all the roles of "Guests"


##usage

first, lets assume we have loaded the following dataset <a href = "exampleRoles.json">exampleRoles.json</a> using roles.load()

###basic permission checks
 
(all the following statements will evaluate to "true")

      if("Marak".can('delete resources')){
        sys.puts('Marak can delete resources'); 
      }

      if(!"Noob".can('delete resources')){
        sys.puts('Noob cannot delete resources.'); 
      }

      if(!"Marak".cannot('delete resources')){
        sys.puts('Marak can delete resources.'); 
      }

      if("Noob".cannot('delete resources')){
        sys.puts('Noob cannot delete resources.'); 
      }

##faq

**how can i use this in my application stack?**

*there are many integration options. if you are using node.js you can require roles.js as a CommonJS module. if your application is not node.js you can use HTTP requests against roles.js self-contained JSON-RPC web-service*

**is my role data stored in a database?**

*by default, no. roles.js is configured to only exist in memory, but you there are many persistence options available.*

**what if i create a circular reference in inheriting roles?**

*you should avoid this, but if you accidentally do, its not that bad. if you create a circular reference in your groups this means that the roles for those groups are complete, and known. if roles.js encounters a circular reference it will break out after a set number of iterations and return the correct roles.*