define(['models/Academic'], function(Academic) {
  var AcademicCollection = Backbone.Collection.extend({
    model: Academic
  });
  return AcademicCollection;
});