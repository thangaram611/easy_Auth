$(document).ready(function() {
	$('.message a').click(function(e) {
		e.preventDefault();
		$('form').animate({
			height: "toggle",
			opacity: "toggle"
		}, "slow");
	});
	$('form#register').submit(function(e) {
		e.preventDefault();
		var req = {};
		$.each($('#register').serializeArray(), function(i, field) {
			req[field.name] = field.value;
		});
		$.post('/register', req, function(data) {
			console.log(data);
			if(data){
				console.log('done');
			}
			else{
				console.log('notdone');	
			}
		});
	});
	$('form#login').submit(function(e) {
		e.preventDefault();
		var req = {};
		$.each($('#login').serializeArray(), function(i, field) {
			req[field.name] = field.value;
		});
		$.post('/checkregistered', req, function(data) {
			console.log(data);
			if(data){
				console.log('done');
			}
			else{
				console.log('notdone');
			}
		});
	});
});
