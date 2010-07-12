/* roles.js  - Marak Squires 2010 */

var sys = require('sys'),
fs = require('fs');

exports._data = null;

exports.addRole = function ( role ) {
  exports._data[1].roles.push( role );
  sys.puts(JSON.stringify(exports._data[1].roles));
};

exports.addUser = function ( user ) {
  exports._data[0].users.push( user );
  sys.puts(JSON.stringify(exports._data[0].users));
};

exports.addGroup = function ( group ) {
  exports._data[0].users.push( user );
  sys.puts(JSON.stringify(exports._data[0].users));
};

exports.addUserToGroup = function ( user, group ) {
  
};

exports.addRoleToGroup = function ( role, group ) {
  
};

exports.inheritGroupRoles = function ( baseGroup, newGroup ) {
  
};
