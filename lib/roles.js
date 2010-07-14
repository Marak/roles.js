/* roles.js  - Marak Squires 2010 */

var sys = require('sys'),
fs = require('fs'),
roles;

roles = exports;

roles._data = null;

var group = function ( name ){
  this.keys = [];
  this.roles = [];
  this.inherits = [];
  return this;
};

roles.load = function ( roles ) {
  roles._data = roles;
};

/******* basic operations for adding keys, roles, groups *******/
roles.addUser = function ( name ) {
  roles._data.keys.push( name );
  //sys.puts(JSON.stringify(roles._data.keys));
};

roles.addRole = function ( role ) {
  roles._data.roles.push( role );
  //sys.puts(JSON.stringify(roles._data.roles));
};

roles.addGroup = function ( name ) {
  roles._data.groups[name] = new group ( name );
  //sys.puts(JSON.stringify(roles._data.groups));
};
/******* endbasic operations *******/

/******* join operations *******/
roles.addUserToGroup = function ( user, group ) {
  roles._data.groups[group].keys.push( user );
  //sys.puts(JSON.stringify(roles._data.groups[group].keys));
};

roles.addRoleToGroup = function ( role, group ) {
  roles._data.groups[group].roles.push( role );
  //sys.puts(JSON.stringify(roles._data.groups[group].roles));
};
/******* end join operations *******/

/******* permission checks*******/

roles.can = function ( key, role ) {
  return true;
}

roles.cannot = function ( key, role ) {
  return false;
}

// prototype string for some sugar syntax
String.prototype.can = function ( role ) {
  
};

String.prototype.cannot = function ( role ) {

};


/******* end permission checks *******/



roles.inheritRolesFromGroup = function ( groupGettingNewRoles,  groupGettingCopied) {
  var base =  roles._data.groups[groupGettingCopied].roles;
  for(var r = 0; r<base.length; r++){
    roles._data.groups[groupGettingNewRoles].roles.push( base[r] );
  }
  //sys.puts(JSON.stringify(roles._data.groups[groupGettingNewRoles].roles));
};

roles.getGroups = function () {
  return roles._data.groups;
};


String.prototype.inGroup = function ( group ) {
  var found = false;
  var groups = roles.getGroups();
  for(var u = 0; u < groups[group].keys.length; u++){
    if(groups[group].keys[u] === this.toString()){
      found = true;
    }
  }
  return found;
};
