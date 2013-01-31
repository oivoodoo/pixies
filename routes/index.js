module.exports = function(app) {
  var User   = app.User;
      sender = app.sender;

  app.get('/', function (request, response) {
    response.render('users');
  });

  app.post('/users', function(request, response) {
    var attributes = request.body.user;
    attributes.key = app.lib.uniq();

    var user = new User(attributes);
    user.save(function(error) {
      if (error) return app.ratchet.reportMessage(error);

      response.redirect("/users/" + user.key);
    });
  });

  app.get('/users/:key', function(request, response) {
    User.find({ key: request.params.key }, function(error, user) {
      if (error) return app.ratchet.reportMessage(error);

      response.render('users/show', {
        user: user[0],
        example: app.lib.example(user[0]),
        host: app.set('host')
      });
    });
  });

  app.post('/emails', function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    response.header("Access-Control-Expose-Headers", "X-Special-Response-Header");
    response.header("Access-Control-Max-Age", "1728000");

    User.find({ key: request.body.key }, function(error, user) {
      if (error) return app.ratchet.reportMessage(error);

      if (user.length === 0) return response.send('-ERR');

      sender.send({
        text: request.body.message,
        from: user[0].email,
        to: user[0].email,
        subject: request.body.from + " sent you message"
      }, function(error, message) {
        if (error) return app.ratchet.reportMessage(error);

        console.log(message);
      });

      response.send('+OK');
    });
  });
};

