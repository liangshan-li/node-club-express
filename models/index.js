/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const User = require('./cms/User');
const Message = require('./cms/Message');
const Reply = require('./cms/Reply');
const Topic = require('./cms/Topic');
const TopicCollect = require('./cms/TopicCollect');

let Models = {};

module.exports = Models;

Models.init = function (options) {
  let mongodbConnector = options.mongodbConnector;

  Models.User = new User({connector: mongodbConnector});
  Models.Reply = new Reply({connector: mongodbConnector});
  Models.Topic = new Topic({connector: mongodbConnector});
  Models.TopicCollect = new TopicCollect({connector: mongodbConnector});
  Models.Message = new Message({connector: mongodbConnector});

  return Models;
};