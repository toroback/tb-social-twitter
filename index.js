let Twit = require('twit')
/**
 * Twitter Adapter 
 * @class
 */
class Adapter{
  constructor(client){
    this.client  = client;
    this.options = {
      consumer_key        : client.options.consumerKey,
      consumer_secret     : client.options.consumerSecret,
      access_token        : client.options.accessToken,
      access_token_secret : client.options.accessTokenSecret,
      timeout_ms          : client.options.timeout || 1000
    }
    this.srv     = new Twit(this.options);
  }

  post(post){
    return new Promise((resolve,reject)=>{
      let message =  post.message + (post.link)? ` ${post.link}`: ''
      this.srv.post('statuses/update', { status: message}, function(err, data, response) {
        if(err){
          reject(err);
          return;
        }
        resolve(data);
      }) 
    })
  }
}

module.exports = Adapter;