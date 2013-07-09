define(['views/index','views/register','views/login', 'views/forgotpassword', 'views/basic','views/referee','models/Profile','models/RefereeCollections'],
	function(IndexView,RegisterView,LoginView,ForgotPasswordView,basicView,RefereeView,Profile,RefereeCollection){
		var NignuxRouter = Backbone.Router.extend({
			currentView: null,
			routes: {
				"index":"index",
				"login":"login",
				"register":"register",
				"forgotpassword":"forgotpassword",
				"profile/:id":"profile",
				"referee/:id": "referee"
			},
			
			
			
			changeView: function(view){
				if(null != this.currentView){
					this.currentView.undelegateEvents();
				}
				this.currentView = view;
				this.currentView.render();
			},
			
			index: function(){
				this.changeView(new IndexView());
			},
			
			login: function(){
				this.changeView(new LoginView());	
			},
			
			register: function(){
				this.changeView(new RegisterView());	
			},
			forgotpassword: function(){
				this.changeView(new ForgotPasswordView());
			},
			referee: function(id){
				var refid = id ? id : 'me';
				var refcollection = new RefereeCollection();
				refcollection.url = '/referee/' + refid;
				this.changeView(new RefereeView({
					collection: refcollection
				}));
				refcollection.fetch();
			},

			profile : function(id){
				var that = this;
				var model = new Profile({id : id});
				this.changeView(new basicView({model:model}));
				model.fetch({
					success: function(){
					}
				});
			}
			
		});
		return new NignuxRouter();
	});
