define(['models/PostPrimary'], function(PostPrimary) {
  var PostPrimaryCollection = Backbone.Collection.extend({
    model: PostPrimary
  });
  return PostPrimaryCollection;
});