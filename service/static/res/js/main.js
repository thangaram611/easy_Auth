$(document).ready(function() {
	$('.message a').click(function(e) {
		e.preventDefault();
		$('.login-page form').animate({
			height: "toggle",
			opacity: "toggle"
		}, "slow");
	});
	// register form submit
	$('form#register').submit(function(e) {
		e.preventDefault();
		var req = {};
		$.each($('#register').serializeArray(), function(i, field) {
			req[field.name] = field.value;
		});
		var email = req.email;
		$.post('/register', req, function(data) {
			if (data) {
				console.log('done');
				var req = { "email": email };
				$.post('/qrcode', req, function(data) {
					$('.login-page').hide();
					$('.twofactor-page').addClass('visible');
					$('#qrcode img').attr('src', data);
				});
			} else {
				console.log('notdone');
			}
		});
	});
	// login form submit
	$('form#login').submit(function(e) {
		e.preventDefault();
		var req = {};
		$.each($('#login').serializeArray(), function(i, field) {
			req[field.name] = field.value;
		});
		$.post('/checkregistered', req, function(data) {
			console.log(data);
			if (data) {
				console.log('done');
				$('.login-page').hide();
				$('.twofactor-page').addClass('visible');
				$('#qrcode').hide();
				$('.token').addClass('visible');
			} else {
				alert("Wrong Credentials");
				console.log('notdone');
			}
		});
	});
	$('#qrcode_button').click(function(e) {
		e.preventDefault();
		$('#qrcode').hide();
		$('.token').addClass('visible');
	});
	$('form#token').submit(function(e) {
		e.preventDefault();
		var req = {};
		$.each($('#token').serializeArray(), function(i, field) {
			req[field.name] = field.value;
		});
		console.log(req);
		$.post('/checktoken', req, function(data) {
			console.log(data + "token");
			if(data){
				window.location.replace('http://localhost:4000/dashboard');
			}
			else{
				alert("token invalid");
			}
		});
	});
});
