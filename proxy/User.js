/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const Models = require('../models');
const User = Models.User;
const Utility = require('utility');
const UUID = require('node-uuid');

class UserProxy {

  getUserByNames(names) {
    if (names.length === 0) {
      return;
    }
    return User.find({login_name: {$in: names}});
  }

  getUserByLoginName(loginName) {
    return User.findOne({login_name: new RegExp('^' + loginName + '$', "i")});
  }

  getUserById(id) {
    if (!id)return;
    return User.findOne({_id: id});
  }

  getUserByEmail(email) {
    if (!email) return;
    return User.findOne({email: email});
  }

  getUsersByIds(ids){
    return User.find({_id:{$in:ids}});
  }

  getUsersByQuery(query,options){
    return User.find(query,'',options);
  }

  getUserByNameAndKey(login_name,key){
    return User.findOne({login_name:login_name,retrieve_key:key});
  }

  build(name,login_name,password,email,avatar,active){
    return User.build({name:name,login_name:login_name,password:password,email:email,avatar:avatar,active:active});
  }
}