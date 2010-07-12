#roles.js


##
completely decoupled from any authentication/routing/orm/database/whatever. roles.js will handle your roles, you can handle the rest.

##users
users is an array of unique usernames. the names can be numbers or UUIDs if you please, as long as they are unique.

##roles
roles are simply roles that a user might be capable of doing


##groups
groups are groups of users and roles. a list of roles is associated with a list of users. groups can also "inherit" roles from other groups creating
a hierarchical structure of groups, users, and roles. 