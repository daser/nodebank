define(function(require) {
  var Profile = Backbone.Model.extend({
    urlRoot: '/profile'
  });

  return Profile;
});