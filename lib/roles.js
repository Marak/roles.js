/* roles.js  - Marak Squires 2010 */

var sys = require('sys'),
fs = require('fs');

exports._data = null;

var group = function ( name ){
  this.keys = [];
  this.roles = [];
  this.inherits = [];
  return this;
};

exports.load = function ( roles ) {
  exports._data = roles;
};

/******* basic operations for adding keys, roles, groups *******/
exports.addUser = function ( name ) {
  exports._data.keys.push( name );
  //sys.puts(JSON.stringify(exports._data.keys));
};

exports.addRole = function ( role ) {
  exports._data.roles.push( role );
  //sys.puts(JSON.stringify(exports._data.roles));
};

exports.addGroup = function ( name ) {
  exports._data.groups[name] = new group ( name );
  //sys.puts(JSON.stringify(exports._data.groups));
};
/******* endbasic operations *******/

/******* join operations *******/
exports.addUserToGroup = function ( user, group ) {
  exports._data.groups[group].keys.push( user );
  //sys.puts(JSON.stringify(exports._data.groups[group].keys));
};

exports.addRoleToGroup = function ( role, group ) {
  exports._data.groups[group].roles.push( role );
  //sys.puts(JSON.stringify(exports._data.groups[group].roles));
};
/******* end join operations *******/



exports.inheritRolesFromGroup = function ( groupGettingNewRoles,  groupGettingCopied) {
  var base =  exports._data.groups[groupGettingCopied].roles;
  for(var r = 0; r<base.length; r++){
    exports._data.groups[groupGettingNewRoles].roles.push( base[r] );
  }
  //sys.puts(JSON.stringify(exports._data.groups[groupGettingNewRoles].roles));
};

exports.getGroups = function () {
  return exports._data.groups;
};

String.prototype.can = function ( role ) {
  var groups = exports.getGroups();
  for(var g in groups){
   /*
    for(var r in )
    sys.puts(
      
      
      
      [role] + this);
  */
  }
  //sys.puts(exports._data.groups[groupGettingCopied].roles);
  //sys.puts(this + ' can ' + role);
  return true;
};

String.prototype.inGroup = function ( group ) {
  var found = false;
  var groups = exports.getGroups();
  for(var u = 0; u < groups[group].keys.length; u++){
    if(groups[group].keys[u] === this.toString()){
      found = true;
    }
  }
  return found;
};