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
				window.location.pathname = "servicereq";
			} else {
				alert("Wrong Credentials");
				console.log('notdone');
			}
		});
	});
	
	$('#req form input').on('change', function() {
		var selected = $('input[name=req_name]:checked', '#req form').val();
		var req = "";
		$.get('/getuniqid', req, function(data) {
			if (selected == "plainlogin") {
				$('#code_tobecopied').val('<script type="text/javascript">document.write(\'<style type="text\/css">h1{text-align: center;margin-bottom: 0;margin-top: 60px;}#lean_overlay{position: fixed;z-index: 100;top: 0px;left: 0px;height: 100%;width: 100%;background: #000;display: none;}.popupContainer{position: absolute;width: 330px;height: auto;left: 45%;top: 60px;background: #FFF;}#modal_trigger{margin: 40px auto;width: 200px;display: block;border: 1px solid #DDD;border-radius: 4px;}.btn{padding: 10px 20px;background: #F4F4F2;}.btn_red{background: #ED6347;color: #FFF;}.btn:hover{background: #E4E4E2;}.btn_red:hover{background: #C12B05;}a.btn{color: #666;text-align: center;text-decoration: none;}a.btn_red{color: #FFF;}.one_half{width: 50%;display: block;float: left;}.one_half.last{width: 45%;margin-left: 5%;}.popupHeader{font-size: 16px;text-transform: uppercase;}.popupHeader{background: #F4F4F2;position: relative;padding: 10px 20px;border-bottom: 1px solid #DDD;font-weight: bold;}.popupHeader .modal_close{position: absolute;right: 0;top: 0;padding: 10px 15px;background: #E4E4E2;cursor: pointer;color: #aaa;font-size: 16px;}.popupBody{padding: 20px;}.social_login{}.social_login .social_box{display: block;clear: both;padding: 10px;margin-bottom: 10px;background: #F4F4F2;overflow: hidden;}.social_login .icon{display: block;width: 10px;padding: 5px 10px;margin-right: 10px;float: left;color: #FFF;font-size: 16px;text-align: center;}.social_login .icon_title{display: block;padding: 5px 0;float: left;font-weight: bold;font-size: 16px;color: #777;}.social_login .social_box:hover{background: #E4E4E2;}.centeredText{text-align: center;margin: 20px 0;clear: both;overflow: hidden;text-transform: uppercase;}.action_btns{clear: both;overflow: hidden;}.action_btns a{display: block;}.user_login{display: none;}.user_login label{display: block;margin-bottom: 5px;}.user_login input[type="text"],.user_login input[type="email"],.user_login input[type="password"]{display: block;width: 90%;padding: 10px;border: 1px solid #DDD;color: #666;}.user_login input[type="checkbox"]{float: left;margin-right: 5px;}.user_login input[type="checkbox"]+label{float: left;}.user_login .checkbox{margin-bottom: 10px;clear: both;overflow: hidden;}.forgot_password{display: block;margin: 20px 0 10px;clear: both;overflow: hidden;text-decoration: none;color: #ED6347;}.user_register{display: none;}.user_register label{display: block;margin-bottom: 5px;}.user_register input[type="text"],.user_register input[type="email"],.user_register input[type="password"]{display: block;width: 90%;padding: 10px;border: 1px solid #DDD;color: #666;}.user_register input[type="checkbox"]{float: left;margin-right: 5px;}.user_register input[type="checkbox"]+label{float: left;}.user_register .checkbox{margin-bottom: 10px;clear: both;overflow: hidden;}<\/style><div class="container"><a id="modal_trigger" href="#modal" class="btn">Login or register<\/a><div id="modal" class="popupContainer" style="display:none;"><header class="popupHeader"><span class="header_title">Login<\/span><span class="modal_close"><i class="fa fa-times"><\/i><\/span><\/header><section class="popupBody"><div class="social_login"><div class="action_btns"><div class="one_half"><a href="#" id="login_form" class="btn">Login<\/a><\/div><div class="one_half last"><a href="#" id="register_form" class="btn">Sign up<\/a><\/div><\/div><\/div><div class="user_login"><form data-uniqid="' + data + '" data-plan="plain" id="authlogin_form"><label>Email \/ Username<\/label><input required name="email" type="email"\/><br\/><label>Password<\/label><input required name="pass" type="password"\/><br\/><div class="action_btns"><div class="one_half"><a href="#" class="btn back_btn"><i class="fa fa-angle-double-left"><\/i> Back<\/a><\/div><div class="one_half last"><a href="#" class="btn btn_red" id="login_btn">Login<\/a><\/div><\/div><\/form><\/div><div class="user_register"><form data-uniqid="' + data + '" id="authregister_form"><label>Full Name<\/label><input required name="name" type="text"\/><br\/><label>Email Address<\/label><input required name="email" type="email"\/><br\/><label>Password<\/label><input required name="pass" type="password"\/><br\/><div class="action_btns"><div class="one_half"><a href="#" class="btn back_btn"><i class="fa fa-angle-double-left"><\/i> Back<\/a><\/div><div class="one_half last"><a href="#" class="btn btn_red" id="register_btn">Register<\/a><\/div><\/div><\/form><\/div><\/section><\/div><\/div>\');$("#modal_trigger").leanModal({top: 100,overlay: 0.6,closeButton: ".modal_close"});$(function(){$("#login_form").click(function(){$(".social_login").hide();$(".user_login").show();return false;});$("#register_form").click(function(){$(".social_login").hide();$(".user_register").show();$(".header_title").text("Register");return false;});$(".back_btn").click(function(){$(".user_login").hide();$(".user_register").hide();$(".social_login").show();$(".header_title").text("Login");return false;});});<\/script>');
			} else if (selected == "twofactorauth") {
				$('#code_tobecopied').val('<script type="text/javascript">document.write(\'<style type="text\/css">h1{text-align: center;margin-bottom: 0;margin-top: 60px;}#lean_overlay{position: fixed;z-index: 100;top: 0px;left: 0px;height: 100%;width: 100%;background: #000;display: none;}.popupContainer{position: absolute;width: 330px;height: auto;left: 45%;top: 60px;background: #FFF;}#modal_trigger{margin: 40px auto;width: 200px;display: block;border: 1px solid #DDD;border-radius: 4px;}.btn{padding: 10px 20px;background: #F4F4F2;}.btn_red{background: #ED6347;color: #FFF;}.btn:hover{background: #E4E4E2;}.btn_red:hover{background: #C12B05;}a.btn{color: #666;text-align: center;text-decoration: none;}a.btn_red{color: #FFF;}.one_half{width: 50%;display: block;float: left;}.one_half.last{width: 45%;margin-left: 5%;}.popupHeader{font-size: 16px;text-transform: uppercase;}.popupHeader{background: #F4F4F2;position: relative;padding: 10px 20px;border-bottom: 1px solid #DDD;font-weight: bold;}.popupHeader .modal_close{position: absolute;right: 0;top: 0;padding: 10px 15px;background: #E4E4E2;cursor: pointer;color: #aaa;font-size: 16px;}.popupBody{padding: 20px;}.social_login{}.social_login .social_box{display: block;clear: both;padding: 10px;margin-bottom: 10px;background: #F4F4F2;overflow: hidden;}.social_login .icon{display: block;width: 10px;padding: 5px 10px;margin-right: 10px;float: left;color: #FFF;font-size: 16px;text-align: center;}.social_login .icon_title{display: block;padding: 5px 0;float: left;font-weight: bold;font-size: 16px;color: #777;}.social_login .social_box:hover{background: #E4E4E2;}.centeredText{text-align: center;margin: 20px 0;clear: both;overflow: hidden;text-transform: uppercase;}.action_btns{clear: both;overflow: hidden;}.action_btns a{display: block;}.user_login{display: none;}.user_login label{display: block;margin-bottom: 5px;}.user_login input[type="text"],.user_login input[type="email"],.user_login input[type="password"]{display: block;width: 90%;padding: 10px;border: 1px solid #DDD;color: #666;}.user_login input[type="checkbox"]{float: left;margin-right: 5px;}.user_login input[type="checkbox"]+label{float: left;}.user_login .checkbox{margin-bottom: 10px;clear: both;overflow: hidden;}.forgot_password{display: block;margin: 20px 0 10px;clear: both;overflow: hidden;text-decoration: none;color: #ED6347;}.user_register{display: none;}.user_register label{display: block;margin-bottom: 5px;}.user_register input[type="text"],.user_register input[type="email"],.user_register input[type="password"]{display: block;width: 90%;padding: 10px;border: 1px solid #DDD;color: #666;}.user_register input[type="checkbox"]{float: left;margin-right: 5px;}.user_register input[type="checkbox"]+label{float: left;}.user_register .checkbox{margin-bottom: 10px;clear: both;overflow: hidden;}#qrcode{display:none;width:100%;text-align:center;}#qrcode img{display:block;padding:10px;margin:10px;}#token_div{display:none;width:100%;text-align:center;}#token_div input{display:block; width: 100%; text-align: center; height: 25px;font-size: 20px;}#token_div label{display:block};<\/style><div class="container"><a id="modal_trigger" href="#modal" class="btn">Login or register<\/a><div id="modal" class="popupContainer" style="display:none;"><header class="popupHeader"><span class="header_title">Login<\/span><span class="modal_close"><i class="fa fa-times"><\/i><\/span><\/header><section class="popupBody"><div class="social_login"><div class="action_btns"><div class="one_half"><a href="#" id="login_form" class="btn">Login<\/a><\/div><div class="one_half last"><a href="#" id="register_form" class="btn">Sign up<\/a><\/div><\/div><\/div><div class="user_login"><form data-uniqid="Ql4CxqMa" data-plan="twofactor" id="authlogin_form"><label>Email / Username<\/label><input required name="email" type="email"/><br/><label>Password<\/label><input required name="pass" type="password"/><br/><div class="action_btns"><div class="one_half"><a href="#" class="btn back_btn"><i class="fa fa-angle-double-left"><\/i> Back<\/a><\/div><div class="one_half last"><a href="#" class="btn btn_red" id="login_btn">Login<\/a><\/div><\/div><\/form><\/div><div class="user_register"><form data-uniqid="Ql4CxqMa" id="authregister_form"><label>Full Name<\/label><input required name="name" type="text"/><br/><label>Email Address<\/label><input required name="email" type="email"/><br/><label>Password<\/label><input required name="pass" type="password"/><br/><div class="action_btns"><div class="one_half"><a href="#" class="btn back_btn"><i class="fa fa-angle-double-left"><\/i> Back<\/a><\/div><div class="one_half last"><a href="#" class="btn btn_red" id="register_btn">Register<\/a><\/div><\/div><\/form><\/div><div id="qrcode"><div class="centeredText"><span>Please scan this QRcode<\/span><\/div><img src="" alt="secret_code"><a href="#" class="btn btn_red" id="qrcode_button">Verify<\/a><\/div><div id="token_div"><form id="token"><label>Enter Token<\/label><input required name="token" type="text"/><br/> <a href="#" class="btn btn_red" id="token_btn">Submit<\/a><\/form><\/div><\/section><\/div><\/div>\');$("#modal_trigger").leanModal({top: 100,overlay: 0.6,closeButton: ".modal_close"});$(function(){$("#login_form").click(function(){$(".social_login").hide();$("#token_div").hide();$(".user_login").show();return false;});$("#register_form").click(function(){$(".social_login").hide();$("#token_div").hide();$(".user_register").show();$(".header_title").text("Register");return false;});$(".back_btn").click(function(){$(".user_login").hide();$("#token_div").hide();$(".user_register").hide();$(".social_login").show();$(".header_title").text("Login");return false;});});<\/script>');
			}
		});
	});
	$('#logout_btn').click(function(e) {
		e.preventDefault();
		var req = "";
		$.get('/logout', req, function(data) {
			if (data) {
				console.log("logout_done");
				window.location.pathname = "/";
			} else {
				console.log("logout_notdone");
			}
		});
	});
});
