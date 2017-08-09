/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const Model=require('../model');
const Type=require('../type');
const _   =require('lodash');

class TopicCollect extends Model{
  setupSchema(){
    super.setupSchema();
    Object.assign(this.schema,{
      user_id:Model.Type(Type.ObjectId),
      topic_id:Model.Type(Type.ObjectId),
      create_at:Model.Type(Type.ObjectId),
    });
  }

  setupSchemaIndex(obj){
    super.setupSchemaIndex(obj);

    this.modelSchema.index({user_id:1,topic_id:1},{unique:true});
  }

  getModelName(){
    return 'TopicCollect';
  }
}

module.exports=TopicCollect;