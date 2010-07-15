/* roles.js  - Marak Squires 2010 */

var sys = require('sys'),
fs = require('fs'),
roles;

roles = exports;

roles._data = null;

/*
var group = function ( name ){
  this.keys = [];
  this.roles = [];
  this.inherits = [];
  return this;
};
*/

roles.load = function ( data ) {
  if(typeof data === 'object'){
    roles._data = data;
  }
  else{
    roles._data = JSON.parse( data );
  }
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
  
  // get all groups that this key belongs to
  var groups = roles.getGroups( key );
  
  sys.puts(JSON.stringify(groups));
  
  return;
  
  for(var g in groups){
    if(key.isIn(groups[g])){
      //sys.puts(g);
    }
  }
  //sys.puts(JSON.stringify(groups, true, 2));
  return true;
}

roles.cannot = function ( key, role ) {
  return false;
}

// checks if a key is in a group
roles.isIn = function ( key, group ) {
  var found = false;
  var groups = roles.getGroups();
  sys.puts(groups[group], group);
  return;
  for(var u in groups[group].keys){
    if(groups[group].keys[u] === this.toString()){
      found = true;
    }
  }
  return found;
}

roles.isntIn = function ( key, group ) {
  return false;
};

// prototype string for some sugar syntax
String.prototype.isIn = function ( group ) {
  return roles.isIn(this, group);
};

String.prototype.isntIn = function ( group ) {
  return roles.isntIn(this, group);
};

String.prototype.can = function ( role ) {
  return roles.can(this, role);
};

String.prototype.cannot = function ( role ) {
  return roles.cannot(this, role);
};

/******* end permission checks *******/

roles.inheritRolesFromGroup = function ( groupGettingNewRoles,  groupGettingCopied) {
  var base =  roles._data.groups[groupGettingCopied].roles;
  for(var r = 0; r<base.length; r++){
    roles._data.groups[groupGettingNewRoles].roles.push( base[r] );
  }
  //sys.puts(JSON.stringify(roles._data.groups[groupGettingNewRoles].roles));
};

roles.inheritGroups = function ( group ) {
  var groupChain = [];
  var inherits = roles._data.groups[group].inherits || []; 
  if(inherits.length == 0){
    return '';
  }
  else{
    for(var i = 0; i < inherits.length; i ++){
      var inherit = inherits[i];
      groupChain.push( inherit );
      var r = roles.inheritGroups( inherit );
      if(r !== ''){
        groupChain.push( roles.inheritGroups( inherit )[0]);
      }
    }
  }
  return groupChain;
};


roles.getGroups = function ( key ) {
  if(typeof key === 'undefined'){
    return roles._data.groups;
  }
  else{
    var groups = [];
    for(var g in roles._data.groups){
      for(var k = 0; k < roles._data.groups[g].keys.length; k++){
        if(roles._data.groups[g].keys[k] == key){
          groups.push( g );
        }
      }
    }
    var inherittedGroups = roles.inheritGroups( groups );
    for(var i = 0; i < inherittedGroups.length; i ++){
      groups.push( inherittedGroups[i] );
    }
    return groups;
  }
};
