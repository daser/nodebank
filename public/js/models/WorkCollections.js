define(['models/Work'], function(Work) {
  var WorkCollection = Backbone.Collection.extend({
    model: Work
  });
  return WorkCollection;
});