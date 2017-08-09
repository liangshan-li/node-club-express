/**
 * Created by liliangshan on 2017/5/20.
 */
const config=require('../config');

class ConfigManager{
  constructor(options){
    this.defaultConf='development';
    this.config=options;
    this.baseConf=this.config[this.defaultConf];
  }
}


module.exports=new ConfigManager(config);