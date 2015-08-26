$(document).ready(function() {
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

	// give result and play with animate 'girl' to be all blue
	// draw a face
		// var face = new Path.Circle(new Point(250,150), 75);

		// var body = new Path();
		// body.add(new Point(100, 600));
		// body.add(new Point(250, 235));
		// body.add(new Point(400, 600));
		// body.closed = true;

		// var arm1 = new Path.Line(new Point(325, 400), new Point(400, 225));
		// var arm2 = new Path.Line(new Point(175,400), new Point(100, 225));

		// var leg1 = new Path.Line(new Point(240, 600), new Point(240,750));
		// var leg2 = new Path.Line(new Point(260, 600), new Point(260,750));

		// var person = new Group({
		//     children:[face, body, arm1, arm2, leg1, leg2],
		//     strokeColor: 'black',
		//     strokeWidth: 8
		// })

		// person.fillColor = 'white';

})

