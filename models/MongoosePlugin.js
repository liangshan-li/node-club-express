/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const Helper=require('../helper');

module.exports=function (modelSchema) {
  modelSchema.methods.create_at_ago=function () {
    return Helper.formatDate(this.create_at,true);
  };

  modelSchema.methods.update_at_ago=function () {
    return Helper.formatDate(this.update_at,true);
  };
};