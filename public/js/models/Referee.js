define(function(require){
  var Referee = Backbone.Model.extend({
    urlRoot: '/referee' 
  });
  return Referee;
});