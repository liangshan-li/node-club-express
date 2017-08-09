/**
 * Created by liliangshan on 2017/5/21.
 */
"use strict";
const Models = require('../models');
const Reply = Models.Reply;
const EventProxy = require('eventproxy');
const Helper = require('../helper');
const UserProxy = require('./User');

class ReplyProxy {

  getReply(id) {
    return Reply.findOne({_id: id});
  }

  getReplyById(id) {
    if (!id) {
      return;
    }

    return Reply.findOne({_id: id}).then((reply) => {
      if (!reply) {
        return new Error('reply is null');
      }
      return UserProxy.getUserById(reply.author_id).then((author) => {
        reply.author = author;

        if (reply.content_is_html) {
          return reply;
        }
        //TODO AT
      });
    });
  }

  getRepliesByTopicId(id) {
    return Reply.find({topic_id: id, deleted: false}, '', {sort: 'create_at'}).then((replies) => {
      if (replies.length === 0) return [];
      let promiseArr=[];
      let proxy = new EventProxy();
      proxy.after('reply_find', replies.length, () => {
        return replies;
      });

      for (let j = 0; j < replies.length; j++) {
        let author_id = replies[j].author_id;

        UserProxy.getUserById(author_id).then((author) => {
          replies[j].author = author || {_id: ''};
          if (replies[j].content_is_html) {
            return proxy.emit('reply_find');
          }
          //todo
        });
      }
    });
  }

  save(content, topicId, authorId, replyId) {
    return Reply.build({content: content, topic_id: topicId, author_id: authorId, reply_id: replyId});
  }

  getLastReplyByTopId(topicId) {
    return Reply.find({topic_id: topicId, deleted: false}, '_id', {sort: {create_at: -1}, limit: 1});
  }

  getRepliesByAuthorId(authorId, options) {
    return Reply.find({author_id: authorId}, {}, options);
  }

  getCountByAuthorId(authorId) {
    return Reply.dao.noSql.count({author_id: authorId});
  }
}