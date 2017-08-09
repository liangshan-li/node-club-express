/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const Model=require('../model');
const Type=require('../type');
/*
 * type:
 * reply: xx 回复了你的话题
 * reply2: xx 在话题中回复了你
 * follow: xx 关注了你
 * at: xx ＠了你
 */

class Message extends Model{
  constructor(options){
    super(options);
  }
  setupSchema(){
    super.setupSchema();

    Object.assign(this.schema,{
      type:Model.Type(Type.String),
      master_id:Model.Type(Type.ObjectId),
      author_id:Model.Type(Type.ObjectId),
      topic_id:Model.Type(Type.ObjectId),
      reply_id:Model.Type(Type.ObjectId),
      has_read:Model.Type(Type.Boolean,false),
      create_at:Model.Type(Type.Date,Date.now()),
      update_at:Model.Type(Type.Date,Date.now())
    });
  }

  getModelName(){
    return 'Message';
  }
}

module.exports=Message;