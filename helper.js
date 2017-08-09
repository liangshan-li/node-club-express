/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const bcrypt=require('bcryptjs');
const moment=require('moment');

moment.locale('zh-cn');//使用中文

module.exports={
  formatDate:function (date, friendly) {
    date=moment(date);
    if(friendly){
      return date.fromNow();
    }else {
      return date.format('YYYY-MM-DD HH:mm');
    }
  },

  validateId:function (str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
  },

  bhash:function (str) {
    return new Promise((resolve,reject)=>{
     return bcrypt.hash(str,10,(err,hash)=>{
        if(err){
          return reject(err);
        }
        return resolve(hash);
      });
    });
  },

  bcompare:function (str, hash) {
    return bcrypt.compare(str,hash);//返回值是promise
  }
};