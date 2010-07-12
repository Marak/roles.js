/* roles.js  - Marak Squires 2010 */

var sys = require('sys'),
fs = require('fs');

exports._data = null;

var group = function ( name ){
  this[name] = {
    users: [],
    roles: [],
    inherits: []
  };
  return this;
};


exports.addUser = function ( name ) {
  exports._data[0].users.push( name );
  sys.puts(JSON.stringify(exports._data[0].users));
};

exports.addRole = function ( role ) {
  exports._data[1].roles.push( role );
  sys.puts(JSON.stringify(exports._data[1].roles));
};

exports.addGroup = function ( name ) {
  exports._data[2].groups.push( new group( name ) );
  sys.puts(JSON.stringify(exports._data[2].groups));
};

exports.addUserToGroup = function ( user, group ) {

};

exports.addRoleToGroup = function ( role, group ) {
  exports._data[2].groups.push( new group( name ) );
  sys.puts(JSON.stringify(exports._data[2].groups));
};

exports.inheritRolesFromGroup = function ( baseGroup, newGroup ) {
  
};
