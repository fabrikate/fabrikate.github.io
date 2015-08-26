paper.install(window);
	var canvas = $('#myCanvas');
	paper.setup(canvas);

	var path;
	var idleTime = 0;
	$('.second').hide();


	function onMouseDown(event) {
		path = new Path();
		path.fillColor = {
			hue: Math.random() * 360,
			saturation: 1,
			brightness: 1,
			opacity: 0.5
		};

		path.add(event.point);
		idleTime = 0;
	}

	function onMouseDrag(event) {
		var paintPoints = event.delta / 2;
		paintPoints.angle += 90;

		var top = event.middlePoint + paintPoints;
		var bottom = event.middlePoint - paintPoints;

		path.add(top);
		path.insert(0, bottom);
		idleTime = 0;
	}

	function onMouseUp(event) {
		path.add(event.point);
		path.closed = true;
		var children = project.activeLayer.children;
		path.smooth();
		path.simplify();
		project.activeLayer.lastChild.blendMode = 'multiply';
		idleTime = 0;
		for( var i= 0; i < (children.length - 5); i++) {
			children[i].opacity = 0.5;
		}
		for(var j = 0; j < (children.length - 15); j++) {
			children[j].visible = false;
		}
	}

	setInterval(idleTimer, 1000);

	$('#clearBtn').on('click', function() {
		project.clear();
	})

	function idleTimer() {
		idleTime = idleTime + 1;
		if(idleTime > 45) {
			$('#myCanvas').fadeOut(2000, function() {
				project.clear();
				$('#myCanvas').fadeIn('slow');
				return idleTime = 0;
			});
		}
	}

	function clearBoard() {
		$('#myCanvas').fadeOut(2000, function() {
			project.clear();
			$('#myCanvas').fadeIn('slow');
		});
	}

	setInterval(clearBoard, 300000);

	paper.view.draw();
