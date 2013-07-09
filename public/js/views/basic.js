define(['NignuxView','text!templates/basic.html'], function(NignuxView,basicTemplate){
	var basicView = NignuxView.extend({
		el: $('#content'),
		initialize: function () {
			_.bindAll(this);
      		this.model.bind('change', this.render, this);
      		//_.bindAll(this, 'render');

	    },
		

	    events:{
	    	"submit form":"updateProfile"
	    },

	    updateProfile : function(){
	    	$.post('/updateProfile',{
	    		firstname: $('input[name=firstname]').val(),
	    		surname: $('input[name=surname]').val(),
	    		othername: $('input[name=othername]').val(),
	    		title: $('select[name=title]').val(),
	    		dob: $('input[name=dob]').val(),
	    		gender: $('select[name=gender]').val(),
	    		marital_status: $('select[name=marital_status]').val(),
	    		religion: $('select[name=religion]').val(),
	    		nationality: $('select[name=nationality]').val(),
				state_of_origin: $('select[name=state_of_origin]').val(),
				//*lga
				home_town: $('input[name=home_town]').val(),
				work_experience: $('select[name=work_experience]').val(),
				years_of_experience: $('select[name=years_of_experience]').val(),
				language: $('input[name=language]').val(),
				nysc_completed: $('select[name=nysc_completed]').val(),
				certificate_no: $('input[name=certificate_no]').val(),
				confirm_nysc: $('input[name=confirm_nysc]').val(),
				nysc_date_completed: $('input[name=nysc_date_completed]').val(),
				contact_address: $('input[name=contact_address]').val(),
				permanent_address: $('input[name=permanent_address]').val(),
				contact_addline: $('input[name=contact_addline]').val(),
				contact_addstate : $('select[name=contact_addstate]').val(),
				permanent_addstate : $('select[name=permanent_addstate]').val(),
				permanent_addline: $('input[name=permanent_addline]').val(),
				contact_addcity: $('input[name=contact_addcity]').val(),
				permanent_addcity: $('input[name=permanent_addcity]').val(),
				permanent_addcountry: $('select[name=permanent_addcountry]').val(),
				contact_addcountry: $('select[name=contact_addcountry]').val(),
				contact_addzip: $('input[name=contact_addzip]').val(),
				permanent_addzip: $('input[name=permanent_addzip]').val(),
				mobile_number: $('input[name=mobile_number]').val(),
				userID: $('input[name=userID]').val()


	    	}, function(data){
	    		console.log(data);
	    	});
	    	return false;
	    },


		render: function(){
			this.model.set("email", this.model.get('email'));
			this.model.set("title", this.model.get('title'));
			this.model.set("dob", this.model.get('dob'));
			this.model.set("gender", this.model.get('gender'));		
			this.model.set("marital_status", this.model.get('marital_status'));
			this.model.set("religion", this.model.get('religion'));
			this.model.set("nationality", this.model.get('nationality'));
			this.model.set("state_of_origin", this.model.get('state_of_origin'));
			this.model.set("home_town", this.model.get('home_town'));
			this.model.set("work_experience", this.model.get('work_experience'));
			this.model.set("years_of_experience", this.model.get('years_of_experience'));
			this.model.set("language", this.model.get('language'));
			this.model.set("nysc_completed", this.model.get('nysc_completed'));
			this.model.set("certificate_no", this.model.get('certificate_no'));
			this.model.set("confirm_nysc", this.model.get('confirm_nysc'));
			this.model.set("nysc_date_completed", this.model.get('nysc_date_completed'));
			this.model.set("contact_address", this.model.get('contact_address'));
			this.model.set("permanent_address", this.model.get('permanent_address'));
			this.model.set("contact_addline", this.model.get('contact_addline'));
			this.model.set("permanent_addline", this.model.get('permanent_addline'));
			this.model.set("contact_addcity", this.model.get('contact_addcity'));
			this.model.set("permanent_addcity", this.model.get('permanent_addcity'));
			this.model.set("permanent_addcountry", this.model.get('permanent_addcountry'));
			this.model.set("contact_addcountry", this.model.get('contact_addcountry'));
			this.model.set("contact_addzip", this.model.get('contact_addzip'));
			this.model.set("permanent_addzip", this.model.get('permanent_addzip'));
			this.model.set("mobile_number", this.model.get('mobile_number'));
			this.model.set("userID", this.model.get('_id'));
			this.model.set("contact_addstate", this.model.get('contact_addstate'));
			this.model.set("permanent_addstate", this.model.get('permanent_addstate'));

			this.model.set("firstname", this.model.get('firstname'));
			this.model.set("surname", this.model.get('surname'));
			this.model.set("othername", this.model.get('othername'));



			this.$el.html(_.template(basicTemplate,this.model.toJSON()));
		}
	});
	
	return basicView;
});
