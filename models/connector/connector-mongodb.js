/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const Connector=require('./connector');

class MongodbConnector extends Connector{
  constructor(options){
    super(options);
    this.mongoose=options.mongoose;
  }

  getConnection(){

  }

  findById(model,id){
  }
  findOne(model,configs){}
  find(model,configs){}
  build(model,configs){}
  update(model,configs){}
  remove(model,configs){}
  save(model,configs){}
}