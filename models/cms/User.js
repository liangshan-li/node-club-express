/**
 * Created by liliangshan on 2017/5/20.
 */
const Model = require('../model');
const Type = require('../type');
const utility=require('utility');

class User extends Model {
  setupSchema() {
    super.setupSchema();

    Object.assign(this.schema, {
      name: Model.Type(Type.String),
      login_name: Model.Type(Type.String),
      password: Model.Type(Type.String),
      email: Model.Type(Type.String),
      url: Model.Type(Type.String),
      profile_image_url: Model.Type(Type.String),
      location: Model.Type(Type.String),
      signature: Model.Type(Type.String),
      profile: Model.Type(Type.String),
      weibo: Model.Type(Type.String),
      avatar: Model.Type(Type.String),
      github_id: Model.Type(Type.String),
      github_user_name: Model.Type(Type.String),
      github_access_token: Model.Type(Type.String),
      is_block: Model.Type(Type.Boolean, false),

      score: Model.Type(Type.Number, 0),
      topic_count: Model.Type(Type.Number, 0),
      reply_count: Model.Type(Type.Number, 0),
      follower_count: Model.Type(Type.Number, 0),
      collect_tag_count: Model.Type(Type.Number, 0),
      collect_topic_count: Model.Type(Type.Number, 0),
      following_count: Model.Type(Type.Number, 0),

      create_at: Model.Type(Type.Date, Date.now()),
      update_at: Model.Type(Type.Date, Date.now()),
      is_star: Model.Type(Type.Boolean),
      level: Model.Type(Type.String),
      active: Model.Type(Type.Boolean, false),
      receive_reply_mail: Model.Type(Type.Boolean, false),
      receive_at_mail: Model.Type(Type.Boolean, false),
      from_wp: Model.Type(Type.Boolean),

      retrieve_time: Model.Type(Type.Number),
      retrieve_key: Model.Type(Type.String),
      access_token: Model.Type(Type.String),
    });
  }

  setupSchemaIndex(obj){
    super.setupSchemaIndex(obj);

    this.modelSchema.virtual('avatar_url').get(function () {
      let url=this.avatar||('https://gravatar.com/avatar/' + utility.md5(this.email.toLowerCase()) + '?size=48');
      // www.gravatar.com 被墙
      url = url.replace('www.gravatar.com', 'gravatar.com');
      // 让协议自适应 protocol，使用 `//` 开头
      if (url.indexOf('http:') === 0) {
        url = url.slice(5);
      }
      // 如果是 github 的头像，则限制大小
      if (url.indexOf('githubusercontent') !== -1) {
        url += '&s=120';
      }
      return url;
    });
  }

  getModelName(){
    return 'User';
  }
}

module.exports=User;