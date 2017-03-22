$(document).ready(function() {
	var uniqid = $('#authlogin_form').data(uniqid);
	var plan = $('#authlogin_form').data(plan);
	$('#login_btn').click(function(e) {
		e.preventDefault();
		var $myForm = $('#authlogin_form');
		if (!$myForm[0].checkValidity()) {
			$('<input type="submit">').hide().appendTo($('#authlogin_form')).click().remove();
		} else {
			var req = {};
			$.each($('#authlogin_form').serializeArray(), function(i, field) {
				req[field.name] = field.value;
			});
			req.uniqid = uniqid.uniqid;
			$.post('/login', req, function(data) {
				console.log(data);
				if (data) {
					console.log("done");
					if (plan.plan == "plain") {
						window.location.pathname = "dashboard";
					} else {
						$(".social_login").hide();
						$(".user_register").hide();
						$(".user_login").hide();
						$("#qrcode").hide();
						$('#token_div').show();
					}
				} else {
					alert("Wrong Credentials");
					console.log('notdone');
				}
			});
		}
	});
	$('#register_btn').click(function(e) {
		e.preventDefault();
		var $myForm = $('#authregister_form');
		if (!$myForm[0].checkValidity()) {
			$('<input type="submit">').hide().appendTo($('#authregister_form')).click().remove();
		} else {
			var req = {};
			$.each($('#authregister_form').serializeArray(), function(i, field) {
				req[field.name] = field.value;
			});
			req.uniqid = uniqid.uniqid;
			$.post('/register', req, function(data) {
				console.log(data);
				if (data) {
					console.log("done");
					if (plan.plan == "plain") {
						window.location.pathname = "dashboard";
					} else if (plan.plan == "twofactor") {
						var req = {};
						req.uniqid = uniqid.uniqid;
						$.post('/qrcode', req, function(data) {
							$(".social_login").hide();
							$(".user_register").hide();
							$(".user_login").hide();
							$('#qrcode img').attr('src', data);
							$("#qrcode").show();
						});
					}
				} else {
					alert("something went wrong");
					console.log('notdone');
				}
			});
		}
	});
	$('#qrcode_button').click(function(e) {
		e.preventDefault();
		$(".social_login").hide();
		$(".user_register").hide();
		$(".user_login").hide();
		$("#qrcode").hide();
		$('#token_div').show();
	});
	$('#token_btn').click(function(e) {
		e.preventDefault();
		var $myForm = $('#token');
		if (!$myForm[0].checkValidity()) {
			$('<input type="submit">').hide().appendTo($('#token')).click().remove();
		} else {
			var req = {};
			$.each($('#token').serializeArray(), function(i, field) {
				req[field.name] = field.value;
			});
			req.uniqid = uniqid.uniqid;
			$.post('/checktoken', req, function(data) {
				console.log(data + "token");
				if (data) {
					alert("token valid");
					window.location.pathname = "dashboard";
				} else {
					alert("token invalid");
				}
			});
		}
	});
});
