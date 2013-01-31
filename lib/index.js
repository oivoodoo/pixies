module.exports = function(app) {
  var crypto = require('crypto')
      hl     = require('highlight').Highlight;

  app.lib = app.lib || {};

  app.lib.uniq = function() {
    return crypto.randomBytes(16).toString('hex');
  };

  app.lib.example = function(user) {
    var html = [];

    html.push("<link rel='stylesheet' type='text/css' href='http://pixie.nko3.jitsu.com/build/build.css' />");
    html.push("<script type='text/javascript' src='http://pixie.nko3.jitsu.com/build/build.js'></script>");
    html.push("<script type='text/javascript'>");
    html.push("  var Feedbacks = require('oivoodoo-feedbacks');");
    html.push("  new Feedbacks({");
    html.push("    label: 'Feedback',");
    html.push("    position: 'left' || 'right', // position on the screen");
    html.push("    class: 'button1' || 'button2' || 'button3' || 'button4', // different colors for the button");
    html.push("    key: '" + user.key + "',");
    html.push("    url: 'http://pixie.nko3.jitsu.com/emails'");
    html.push("  });");
    html.push("</script>");

    return hl(html.join('\n'));
  };
};

