define(function(require){
  var PostPrimary = Backbone.Model.extend({
    urlRoot: '/postprimary'
  });
  return PostPrimary;
});