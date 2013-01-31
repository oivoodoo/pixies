var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

module.exports = function(app) {
  var Users = new Schema({
    email: { type: String, required: true },
    key: { type: String, required: true }
  });

  mongoose.connect(process.env.MONGO_URL, function(error) {
    if (error) return app.ratchet.reportMessage(error);
  });

  var User = mongoose.model('User', Users);

  app.User = User;
};

