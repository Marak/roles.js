/* roles.js  - Marak Squires 2010 */

var sys = require('sys'),
fs = require('fs');

exports._data = null;

var group = function ( name ){
  this.users = [];
  this.roles = [];
  this.inherits = [];
  return this;
};


exports.addUser = function ( name ) {
  exports._data[0].users.push( name );
  //sys.puts(JSON.stringify(exports._data[0].users));
};

exports.addRole = function ( role ) {
  exports._data[1].roles.push( role );
  //sys.puts(JSON.stringify(exports._data[1].roles));
};

exports.addGroup = function ( name ) {
  exports._data[2].groups[name] = new group ( name );
  //sys.puts(JSON.stringify(exports._data[2].groups));
};

exports.addUserToGroup = function ( user, group ) {
  exports._data[2].groups[group].users.push( user );
  //sys.puts(JSON.stringify(exports._data[2].groups[group].users));
};

exports.addRoleToGroup = function ( role, group ) {
  exports._data[2].groups[group].roles.push( role );
  //sys.puts(JSON.stringify(exports._data[2].groups[group].roles));
};

exports.inheritRolesFromGroup = function ( groupGettingNewRoles,  groupGettingCopied) {
  var base =  exports._data[2].groups[groupGettingCopied].roles;
  for(var r = 0; r<base.length; r++){
    exports._data[2].groups[groupGettingNewRoles].roles.push( base[r] );
  }
  //sys.puts(JSON.stringify(exports._data[2].groups[groupGettingNewRoles].roles));
};

exports.getGroups = function () {
  return exports._data[2].groups;
};

String.prototype.can = function ( role ) {
  var groups = exports.getGroups();
  for(var g in groups){
    //sys.puts(groups[g].users);
  }
  //sys.puts(exports._data[2].groups[groupGettingCopied].roles);
  //sys.puts(this + ' can ' + role);
  return true;
};

String.prototype.inGroup = function ( group ) {
  var found = false;
  var groups = exports.getGroups();
  for(var u = 0; u < groups[group].users.length; u++){
    if(groups[group].users[u] === this.toString()){
      found = true;
    }
  }
  return found;
};