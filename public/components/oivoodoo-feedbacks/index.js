var $      = require('zepto-component'),
    dialog = require('dialog'),
    form   = require('./form');

var Feedbacks = function(options) {
  if (typeof options.key === 'undefined') return;
  this.key = options.key;

  this.parse(options)

  this.form();
  this.html();
  this.events();
};

Feedbacks.prototype.form = function() {
  var context = this;

  this.form = $(form);
  var button = this.form.find('input[type=submit]');

  button.click(function(event) {
    event.preventDefault();

    var email = context.form.find('input[name=email]');
    var message = context.form.find('textarea');

    $.ajax({
      type: 'POST',
      url: context.url,
      crossDomain: true,
      data: {
        from: email.val(),
        message: message.val(),
        key: context.key
      },
      dataType: 'json'
    });

    email.val('');
    message.val('');

    context.dialog.hide();
  });
};

Feedbacks.prototype.parse = function(options) {
  this.url = options.url || "http://pixie.nko3.jitsu.com/emails";
  this.label = options.label || "Feedback";
  this.class = options.class || "button1";
  this.position = options.position || 'left';
};

Feedbacks.prototype.html = function() {
  this.container = $("<div id='feedbacks' class='" + this.class + " " + this.position + "'>");
  this.button = $("<span>" + this.label + "</span>");

  this.container.append(this.button);
  $('body').append(this.container);
};

Feedbacks.prototype.events = function() {
  var context = this;

  $(this.button).click(function(event) {
    event.preventDefault();

    context.dialog = dialog(context.label, context.form)
      .closable()
      .modal()
      .effect('slide')
      .show();
  });
};

module.exports = Feedbacks;

