var express = require('express');
var http = require('http');
var app = express();
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;

var dbPath = 'mongodb://daser:admin@ds045157.mongolab.com:45157/cvbank';
var mongoose = require('mongoose');
var config = {
	mail: require('./config/mail')
};
//import the models
var models = {
	Account: require('./models/Account')(config, mongoose, nodemailer)
};


app.configure(function(){
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(express.limit('1mb'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	secret: "Nignux Paygis Secret Key",
	store: new MemoryStore()
	}));
	
	mongoose.connect(dbPath, function onMongooseError(err){
		if(err) throw err;
	});
});


app.get('/', function(req, res){
res.render("index.jade", {layout:false});
});


app.get('/logout', function(req, res){
  console.log('Serving request for url [GET] ' + req.route.path);
  req.session.loggedIn = false;
  req.session.accountId = undefined;
  //the code below totally destroys all session while the above 
  //works like PHP unset function to clear some specific session
  //i am disabling it because i will need it 
 // req.session.destroy();
  res.redirect('/');
});




app.post('/forgotpassword', function(req, res){
	var hostname = req.headers.host;
	var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
	var email = req.param('email', null);
	if(null == email || email.length < 1){
		res.send(400);
		return;
	}
	
	models.Account.forgotPassword(email, resetPasswordUrl, function(success){
		if(success){
			res.send(200);
		}else{
			res.send(400);
		}
	});
	
});



app.get('/account/authenticated', function(req,res){
	if(req.session && req.session.loggedIn){
		res.send(200);
	}else{
		res.send(401);
	}
});


app.get('/resetPassword', function(req, res){
	var accountId = req.param('account', null);
	res.render('resetPassword.jade',{locals:{accountId:accountId}});
});

app.get('/profile/:id', function(req,res){
	var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
	models.Account.findById(accountId, function(account){
		console.log(account);
		res.send(account);
	});
});


app.delete('/accounts/:id/referee', function(req,res) {
  var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
  var refereeId = req.param('refereeId', null);
  // Missing contactId, don't bother going any further
  if ( null == refereeId ) {
    res.send(400);
    return;
  }

  models.Account.findById(accountId, function(account) {
    if ( !account ) return;
    console.log("a = " + refereeId);  
      console.log('b');
      models.Account.removeReferee(account, refereeId);

  });
	res.send(200);
});

app.get('/referee/:id', function(req,res){
	var accountId = req.params.id == 'me' ? req.session.accountId : req.params.id;
		models.Account.findById(accountId, function(account){
		res.send(account.referee);
	});
});


app.post('/accounts/:id/referee', function(req, res) {
  var accountId = req.params.id == 'me'
                     ? req.session.accountId
                     : req.params.id;
  models.Account.findById(accountId, function(account) {
   var referee = {
    	ref_name : req.param('ref_fullname', ''),	
		ref_pnumber : req.param('ref_phone', '') ,
		ref_address : req.param('ref_address', '')
    };
    console.log("Full Duty = " + referee );
    account.referee.push(referee);

    // Push the status to all friends
    account.save(function (err) {
      if (err) {
        console.log('Error saving account: ' + err);
      }
    });
  });
  res.send(200);
});

app.post('/resetPassword', function(req, res){
	var accountId = req.param('accountId', null);
	var password = req.param('password', null);
	if(null != accountId && null != password){
		models.Account.changePassword(accountId, password);
	}
	res.render('resetPasswordSuccess.jade');

});

app.post('/updateprofile', function(req,res){
	var firstname = req.param('firstname', null);
	var surname = req.param('surname', null);
	var othername = req.param('othername', null); 
	var title = req.param('title');
	var dob = req.param('dob', null);
	var gender = req.param('gender', null);
	var marital_status = req.param('marital_status', null);
	var religion = req.param('religion', null);
	var nationality = req.param('nationality', null);
	var state_of_origin = req.param('state_of_origin', null);
	var home_town = req.param('home_town', null);
	var work_experience = req.param('work_experience', null);
	var years_of_experience = req.param('years_of_experience', null);
	var language = req.param('language', null); 
	var nysc_completed = req.param('nysc_completed', null);
	var certificate_no = req.param('certificate_no', null);
	var confirm_nysc = req.param('confirm_nysc', null);
	var nysc_date_completed = req.param('nysc_date_completed', null);
	var contact_address = req.param('contact_address', null);
	var permanent_address = req.param('permanent_address', null);
	var contact_addline = req.param('contact_addline', null);
	var permanent_addline = req.param('permanent_addline', null);
	var contact_addcity = req.param('contact_addcity', null);
	var permanent_addcity = req.param('permanent_addcity', null);
	var permanent_addcountry = req.param('permanent_addcountry', null);
	var contact_addcountry = req.param('contact_addcountry', null);
	var contact_addzip = req.param('contact_addzip', null);
	var permanent_addzip = req.param('permanent_addzip', null);
	var mobile_number = req.param('mobile_number', null);
	var userID = req.param('userID', null);
	var contact_addstate = req.param('contact_addstate', null);
	var permanent_addstate = req.param('permanent_addstate', null);

	
	console.log("Title at appjs = " + title);
	models.Account.updateProfile(firstname,surname,othername,permanent_addcountry,contact_addcountry,permanent_addstate,contact_addstate,title,dob,gender,marital_status,religion,nationality,state_of_origin,home_town,work_experience,years_of_experience,language,nysc_completed,certificate_no,confirm_nysc,
nysc_date_completed,contact_address,permanent_address,contact_addline,permanent_addline,contact_addcity,permanent_addcity,permanent_addcountry,contact_addcountry,contact_addzip,permanent_addzip,mobile_number,userID
);
});


app.post('/register', function(req, res){
	var firstName = req.param('firstname', '');
	var lastName = req.param('lastname', '');
	var email = req.param('email', null);
	var password = req.param('password', null);
	
	if(null == email || email.length < 1 || null == password || password.length < 1){
		res.send(400);
		return;
	}
	models.Account.register(email, password, firstName, lastName);
	res.send(200);
});

app.post('/login', function(req, res){
	console.log('login request');
	var email = req.param('email', null);
	var password = req.param('password', null);
	if(null == email || email.length < 1 || null == password || password.length < 1){
		res.send(400);
		return;
	}
	
	models.Account.login(email, password, function(account){
		if(!account){
			res.send(401);
			return;
		}
		console.log('login was successful');
		req.session.loggedIn = true;
		req.session.accountId = account._id;
		res.send(200);
	});
});







//app.listen(8080);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
