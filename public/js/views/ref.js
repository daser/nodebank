define(['NignuxView', 'text!templates/ref.html'], function(NignuxView, refTemplate) {
  var refView = NignuxView.extend({
    tagName: 'li',

    render: function() {
    	console.log(this.model.toJSON());
      $(this.el).html(_.template(refTemplate,this.model.toJSON()));
      return this;
    }
  });

  return refView;
});