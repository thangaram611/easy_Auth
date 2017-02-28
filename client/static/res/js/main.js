$(document).ready(function(){
	$('#login_btn').click(function(e){
		e.preventDefault();
		console.log("button clicked");
		window.location.replace("http://localhost:8080/");
	});
	$('#detail_btn').click(function(e){
		e.preventDefault();
		var req = {};
		$.get('/detail', req, function(data){
			console.log("data "+data);
			$('#details').html(data);
		});
	});
});