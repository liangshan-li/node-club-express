/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const Model=require('../model');
const Type=require('../type');

class Reply extends Model{

  setupSchema(){
    super.setupSchema();

    Object.assign(this.schema,{
      content:Model.Type(Type.String),
      topic_id:Model.Type(Type.ObjectId),
      author_id:Model.Type(Type.ObjectId),
      reply_id:Model.Type(Type.ObjectId),
      create_at:Model.Type(Type.Date,Date.now()),
      update_at:Model.Type(Type.Date,Date.now()),
      content_is_html:Model.Type(Type.Boolean),
      ups:Model.Type(Type.Arr_id),
      deleted:Model.Type(Type.Boolean,false)
    });
  }

  getModelName(){
    return 'Reply';
  }
}

module.exports=Reply;