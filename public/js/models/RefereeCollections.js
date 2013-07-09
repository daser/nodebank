define(['models/Referee'], function(Referee) {
  var RefereeCollection = Backbone.Collection.extend({
    model: Referee
  });
  return RefereeCollection;
});