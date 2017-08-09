/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const mongoose = require('mongoose');
const _ = require('lodash');
const Type = require('./type');
const Connector = require('./connector/connector');
const Schema = mongoose.Schema;

class Model {
  constructor(config) {
    this.schema = Object.create(null);
    this.connector = config.connector || Connector;
    this.dao = {};
    this.setupSchema();
    this.setModelSchema();
    this.setupSchemaPlugin(config.plugin);
    this.setupSchemaIndex(config.index);
    this.setupDao();
  }

  getSchema() {
    return this.schema;
  }

  getNoSqlDao() {
    return this.dao.noSql;
  }

  getModelName() {
    throw new Error('subclass must provide a models name!');
  }

  setupSchema() {

  }

  setupSchemaPlugin(plugin) {
    if (!plugin)return;
    this.modelSchema.plugin(plugin);
  }

  setupSchemaIndex(obj) {
    if (obj instanceof Array) {
      obj.forEach((item, idx) => {
        this.modelSchema.index(item);
      });
    }
    else if (obj instanceof Object) {
      this.modelSchema.index(obj);
    }
  }

  setModelSchema() {
    this.modelSchema = new Schema(this.noSqlSchema());
  }

  setupDao() {
    this.dao.noSql = this.connector.mongoose.model(this.getModelName(), this.modelSchema);
  }

  build(options) {
    return this.connector.build(this, options);
  }

  findOne(options) {
    return this.connector.findOne(this, options);
  }

  find(options) {
    return this.connector.find(this, options);
  }

  update(options) {
    return this.connector.update(this, options);
  }

  remove(options) {
    return this.connector.remove(this, options);
  }

  findById(id) {
    return this.connector.findById(this, id);
  }

  save(options) {
    return this.connector.save(this, options);
  }

  noSqlSchema() {
    let seqSchema = {};
    _.forEach(_.keys(this.schema), (name, idx) => {
      let type = this.schema[name].type;
      let conf = this.schema[name].options;

      if (type === Type.String) {
        seqSchema[name] = {type: Schema.Types.String};
      }
      else if (type === Type.Number) {
        seqSchema[name] = {type: Schema.Types.Number};
      }
      else if (type === Type.ObjectId) {
        seqSchema[name] = {type: Schema.Types.ObjectId};
      }
      else if (type === Type.Buffer) {
        seqSchema[name] = {type: Schema.Types.Buffer};
      }
      else if (type === Type.Boolean) {
        seqSchema[name] = {type: Schema.Types.Boolean};
      }
      else if (type === Type.Date) {
        seqSchema[name] = {type: Schema.Types.Date};
      }
      else if (type === Type.Array) {
        seqSchema[name] = {type: Schema.Types.Array};
      }
      else if (type === Type.Mixed) {
        seqSchema[name] = {type: Schema.Types.Mixed};
      }
      else if (type === Type.Arr_id) {
        seqSchema[name] = [Schema.Types.ObjectId]
      }

      if (conf) {
        if (type === Type.Arr_id) {
          return;
        }
        seqSchema[name] = {type: seqSchema[name].type, default: conf};
      }

      return seqSchema;
    });
  }

  static Type(typename, options) {
    if (options) {
      return {
        type: typename,
        options: options,
      };
    }
    return {type: typename};
  }
}