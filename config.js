/**
 * Created by liliangshan on 2017/5/20.
 */
"use strict";
const path=require('path');

module.exports={
  development:{
    debug:true,
    name:'Node-club',
    description:'CNode:Node.js',
    keywords:'nodejs,node,express,connect,socket.io',

    //添加到html head 中的信息
    site_head:[
      '<meta name="author" content="EDP@TAOBAO" />'
    ],
    site_logo:'/public/images/cnodejs_light.svg',
    site_icon:'/public/images/cnodejs_icon_32.png',
    //右上角导航区
    site_navs:[
      //format [path,title,[target='']]
      ['/about','关于']
    ],
    site_static_host:'',
    host:'localhost',
    google_tracker_id:'',
    cnzz_tracker_id:'',

    port:3100,
    db:{
      mongodb:{
        url:'mongod://127.0.0.1/node_club_dev'
      },
      redis:{
        host:'127.0.0.1',
        port:6379,
        db_name:0,
        password:'',
      }
    },

    session_cookie:{
      session_secret:'node_club_secret',
      cookie_name:'node_club'
    },
    rss:{
      title: 'CNode：Node.js专业中文社区',
      link: 'http://cnodejs.org',
      language: 'zh-cn',
      description: 'CNode：Node.js专业中文社区',
      //最多获取的RSS Item数量
      max_rss_items: 50
    },

    topic_count:20,
    // 邮箱配置
    mail_opts: {
      host: 'smtp.126.com',
      port: 25,
      auth: {
        user: 'club@126.com',
        pass: 'club'
      },
      ignoreTLS: true,
    },

    //weibo app key
    wei_bo:{
      key:10000000,
      id:'your_weibo_id',
    },

    // admin 可删除话题，编辑标签
    admin:{
      name:''
    },

    // github 登陆的配置
    github_auth: {
      clientID: 'your GITHUB_CLIENT_ID',
      clientSecret: 'your GITHUB_CLIENT_SECRET',
      callbackURL: 'http://cnodejs.org/auth/github/callback'
    },
    // 是否允许直接注册（否则只能走 github 的方式）
    allow_sign_up: true,

    // oneapm 是个用来监控网站性能的服务
    oneapm_key: '',

    // 下面两个配置都是文件上传的配置

    // 7牛的access信息，用于文件上传
    qn_access: {
      accessKey: 'your access key',
      secretKey: 'your secret key',
      bucket: 'your bucket name',
      origin: 'http://your qiniu domain',
      // 如果vps在国外，请使用 http://up.qiniug.com/ ，这是七牛的国际节点
      // 如果在国内，此项请留空
      uploadURL: 'http://xxxxxxxx',
    },

    // 文件上传配置
    // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
    upload: {
      path: path.join(__dirname, 'public/upload/'),
      url: '/public/upload/'
    },

    file_limit: '1MB',

    // 版块
    tabs: [
      ['share', '分享'],
      ['ask', '问答'],
      ['job', '招聘'],
    ],

    // 极光推送
    jpush: {
      appKey: 'YourAccessKeyyyyyyyyyyyy',
      masterSecret: 'YourSecretKeyyyyyyyyyyyyy',
      isDebug: false,
    },

    create_post_per_day: 1000, // 每个用户一天可以发的主题数
    create_reply_per_day: 1000, // 每个用户一天可以发的评论数
    create_user_per_ip: 1000,
    visit_per_day: 1000, // 每个 ip 每天能访问的次数
  },
  production:{

  }
};