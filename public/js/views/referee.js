define(['NignuxView','text!templates/referee.html','views/ref','models/Referee'], function(NignuxView, refereeTemplate,RefereeView, Referee){
var refereeView = NignuxView.extend({
	 el: $('#content'),
	 
	 events:{
	 	"submit form" : "updateReferee",
	 	"click #referee-delete-button": "deleteRow",

	 },


	 deleteRow: function(ev){
	 	var $responseArea = this.$('.actionarea');
		$responseArea.text('Removing referee...');
	 	var refid = $(ev.target).data('refid');
	 	$.ajax({
		url: '/accounts/me/referee',
		type: 'DELETE',
		data: {
			refereeId: refid
			}}).done(function onSuccess() {
			$responseArea.text('Referee Removed');
			}).fail(function onError() {
			$responseArea.text('Could not remove referee');	
		});

	 },

	 updateReferee: function(){
	 		var $responseArea = this.$('.actionarea');
			$responseArea.text('Adding a new referee...');

	 	  var ref_fullname = $('input[name=ref_fullname]').val();
	 	  var ref_phone = $('input[name=ref_phone]').val();
	 	  var ref_address = $('textarea[name=ref_address]').val();

	 	var refereeCollection = this.collection;
	 	$.post('/accounts/me/referee', {
	 		ref_fullname: ref_fullname,
	 		ref_phone: ref_phone,
	 		ref_address: ref_address

	 	}, function(data){
	 		$responseArea.text('');
	 		refereeCollection.add(new Referee({ref_name:ref_fullname,ref_pnumber:ref_phone,ref_address:ref_address}));
	 	});
	 	return false;
	 },
	 initialize: function(){
	 	console.log("Initialize is called here");
	 	this.collection.on('add', this.onRefereeAdded, this);
	 	this.collection.on('reset', this.onRefereeCollectionReset, this)
	 },

	 onRefereeCollectionReset: function(collection){
	 	var that = this;
	 	console.log("reset is called here");
	 	collection.each(function(model){
	 		that.onRefereeAdded(model);
	 	});
	 },

	 onRefereeAdded: function(referee){
	 	console.log("On Added is called here" + referee);
	 	var refereeHtml = (new RefereeView({model: referee})).render().el;
	 	$(refereeHtml).prependTo('.referee_list').hide().fadeIn('slow');
	 },

	 render: function() {
      this.$el.html(refereeTemplate);
    }
});
return refereeView;
});