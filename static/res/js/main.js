$(document).ready(function() {
	$('.message a').click(function(e) {
		e.preventDefault();
		console.log('nandini');
		$('form').animate({
			height: "toggle",
			opacity: "toggle"
		}, "slow");
	});
});
