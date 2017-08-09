/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const Model=require('../model');
const Type=require('../type');
const _   =require('lodash');

class Topic extends Model{
  setupSchema(){
    super.setupSchema();

    Object.assign(this.schema,{
      title:Model.Type(Type.String),
      content:Model.Type(Type.String),
      author_id:Model.Type(Type.ObjectId),
      top:Model.Type(Type.Boolean,false),
      good:Model.Type(Type.Boolean,false),
      lock:Model.Type(Type.Boolean,false),
      reply_count:Model.Type(Type.Number,0),
      visit_count:Model.Type(Type.Number,0),
      collect_count:Model.Type(Type.Number,0),
      create_at:Model.Type(Type.Date,Date.now()),
      update_at:Model.Type(Type.Date,Date.now()),
      last_reply:Model.Type(Type.ObjectId),
      last_reply_at:Model.Type(Type.Date,Date.now()),
      content_is_html:Model.Type(Type.Boolean),
      tab:Model.Type(Type.String),
      deleted:Model.Type(Type.Boolean,false)
    });
  }
  setupSchemaIndex(obj){
    super.setupSchemaIndex(obj);
    this.modelSchema.index({create_at:-1});
    this.modelSchema.index({top:-1,last_reply_at:-1});
    this.modelSchema.index({author_id:1,create_at:-1});

    this.modelSchema.virtual('tabName').get(function () {
      let tab=this.tab;
      let pair=_.find('',function (_pair) {
        return _pair[0]===tab;
      });

      if(pair){
        return pair[1];
      }else {
        return '';
      }
    });
  }

  getModelName(){
    return 'Topic';
  }
}

module.exports=Topic;