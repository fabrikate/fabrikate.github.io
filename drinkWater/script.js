$(document).ready(function() {
	$.ajax({
		url: '/paperScript.js',
		dataType: 'script'
	})
	var userGuess, results;

	// get input and calculte ounces of h2o to drink
	function convertInput2Ounces() {
		var weight = parseInt($('#weight').val());
		console.log(weight);
		if(isNaN(weight)) {
			$('#results').text('Please Enter a valid weight');
		} else {
			//get how many 12oz water bottles they should drink
			userGuess = $('#numBottlesGuess').val()
			var ouncesOfwater = weight / 2;
			var bottlePref = parseInt($('select').val());
			results = Math.round(ouncesOfwater / bottlePref);
			$('#results').text('You should drink ' + results +
				' bottles of water a day. You guessed you should drink ' + userGuess + ' 12oz water bottles.');
		}
	}

	$('#waterCalc').on('click', 'button', function(e) {
		e.preventDefault();
		convertInput2Ounces();
		$('#numBottlesGuess').val(' ');
		$('#weight').val('');
	});

})

