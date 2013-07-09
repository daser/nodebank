module.exports = function(config,mongoose,nodemailer){
	var crypto = require('crypto');



	var Work = new mongoose.Schema({
		organisation : {type: String},
		start_date : {type : String},
		status : {type: String},
		end_date : {type: String},
		job_title : {type: String},
		job_description : {type : String}
	});

	var PostPrimary = new mongoose.Schema({
		postpri_school :  {type : String},
		subject : {type : String},
		noof_sitting : {type : String},
		grade : {type : String}
	});

	var Referee = new mongoose.Schema({
		ref_name : {type : String},	
		ref_pnumber : {type : String},
		ref_address : {type : String}
	});

	var Academic = new mongoose.Schema({
		category : {type : String},
		institution : {type : String},
		course : {type : String},
		qualification : {type : String},
		grade : {type : String},
		grad_year : {type : String}
	});




	var AccountSchema = new mongoose.Schema({
		email : {type: String, unique: true},
		password: {type: String},
		name: {
			firstname : {type: String},
			middlename : {type: String},
			lastname : {type: String}
		},
		title : {type: String},
		dob : { type: String},
		gender : {type: String},
		marital_status : {type: String},
		religion : {type: String},
		nationality : {type: String},
		state_of_origin : {type: String},
		lga : {type: String},
		home_town : {type: String},
		language : {type: String},
		work_experience : {type : String},
		years_of_experience : {type : String},
		nysc_completed : {type: String},
		nysc_certificate : {type: String},
		confirm_nysc : {type: String},
		certificate_no : {type: String},
		nysc_date_completed : {type: String},
		contact_address : {type: String},
		contact_addline : {type: String},
		contact_addcity : {type: String},
		contact_addcountry : {type: String},
		contact_addstate : {type: String},
		contact_addzip : {type: String},
		permanent_address : {type: String},
		permanent_addline : {type: String},
		permanent_addcity : {type: String},
		permanent_addcountry : {type: String},
		permanent_addstate : {type: String},
		permanent_addzip : {type: String},
		referee : [Referee],
		postprimary : [PostPrimary],
		work : [Work],
		academic : [Academic],
		mobile_number : {type: String}	
	});
	
	
	var Account = mongoose.model('Account', AccountSchema);
	
	var registerCallback = function(err){
		if(err){
			return console.log(err);
		};
		return console.log('Account was created');
	};
	
	
	var register = function(email, password,firstname, lastname){
		var shaSum = crypto.createHash('sha256');
		shaSum.update(password);
		console.log('Registering ....' + email);
		var user = new Account({
			email: email,
			name: {
				firstname:firstname,
				lastname:lastname
			},
			password: shaSum.digest('hex')
		}		
		);
		user.save(registerCallback);
		console.log('Save command was sent');
	};
	
	var findById = function(accountId, callback) {
		Account.findOne({_id:accountId}, function(err,doc) {
		callback(doc);
		});
	};

	
	var login = function(email, password, callback){
		var shaSum = crypto.createHash('sha256');
		shaSum.update(password);
		Account.findOne({email: email, password: shaSum.digest('hex')}, function(err,doc){
			callback(doc);
		});
	};
	
	
	var changePassword = function(accountId, newpassword) {
		var shaSum = crypto.createHash('sha256');
		shaSum.update(newpassword);
		var hashedPassword = shaSum.digest('hex');
		Account.update({_id:accountId},{$set:{password:hashedPassword}},{upsert:false}, 
			function changePasswordCallback(err){
				console.log('Change password done for account ' + accountId);
			});
	};
	

 var removeReferee = function(account, refereeId) {
    if ( null == account.referee ) return;
    account.referee.forEach(function(ref) {
      if (ref._id == refereeId ) {
        account.referee.remove(ref);
      }
    });
    account.save();
  };





	var updateProfile = function(firstname,surname,othername,permanent_addcountry,contact_addcountry,permanent_addstate,contact_addstate,title,dob,gender,marital_status,religion,nationality,state_of_origin,home_town,work_experience,years_of_experience,language,nysc_completed,certificate_no,confirm_nysc,
nysc_date_completed,contact_address,permanent_address,contact_addline,permanent_addline,contact_addcity,permanent_addcity,permanent_addcountry,contact_addcountry,contact_addzip,permanent_addzip,mobile_number,userID
){	
		console.log("title at accountjsis: " + permanent_addstate);
		console.log("userid is " + contact_addstate);
		Account.update({_id:userID},{$set:{'name.firstname':firstname,'name.lastname':surname,'name.middlename':othername,permanent_addcountry:permanent_addcountry,contact_addcountry:contact_addcountry,permanent_addstate:permanent_addstate,contact_addstate:contact_addstate,title:title,dob:dob,gender:gender,marital_status:marital_status,religion:religion,nationality:nationality,state_of_origin:state_of_origin,home_town:home_town,work_experience:work_experience,years_of_experience:years_of_experience,language:language,nysc_completed:nysc_completed,certificate_no:certificate_no,confirm_nysc:confirm_nysc,
nysc_date_completed:nysc_date_completed,contact_address:contact_address,permanent_address:permanent_address,contact_addline:contact_addline,permanent_addline:permanent_addline,contact_addcity:contact_addcity,permanent_addcity:permanent_addcity,permanent_addcountry:permanent_addcountry,contact_addcountry:contact_addcountry,contact_addzip:contact_addzip,permanent_addzip:permanent_addzip,mobile_number:mobile_number}}, {upsert:true}, 
			function updateCallback(err){
				console.log('Update performed for account' + userID);
			});
	};

	
	var forgotPassword = function(email, resetPasswordUrl, callback){
		var user = Account.findOne({email: email}, function findAccount(err, doc){
			if(err){
				callback(false);
			}else{
				var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
				resetPasswordUrl += '?account=' + doc._id;
				smtpTransport.sendMail({
					from: 'daseronline@gmail.com',
					to: doc.email,
					subject: 'Paygis Password Request',
					text: 'Click here to reset your password: ' + resetPasswordUrl
				}, function forgotPasswordResult(err){
					if(err){
						callback(false);
					}else{
						callback(true);
					}
				});
			}
		})
	};
	
	
	
	return {
		findById: findById,
		register : register,
		login : login,
		changePassword : changePassword,
		forgotPassword : forgotPassword,
		removeReferee : removeReferee,
		updateProfile : updateProfile,
		Account : Account
	}
	
}
