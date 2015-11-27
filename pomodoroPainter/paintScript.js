  var path;
  var idleTime = 0;
  // hide the second canvas from view
  $('.second').hide();

  //mouse down creates a path that creates points, gives it varying colors
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

  //Mouse drag gives the width and angle of the stroke depending on mouse Drag
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
    // start making the strokes fade after 5 strokes
    for( var i= 0; i < (children.length - 5); i++) {
      children[i].opacity = 0.5;
    }
    // start removing strokes after 15 strokes
    for(var j = 0; j < (children.length - 15); j++) {
      children[j].visible = false;
    }
  }
  // button to clear the board
  $('#clearBtn').on('click', function() {
    project.clear();
  })

  //set a timer for the idle counter.
  setInterval(idleTimer, 1000);
  // When the canvas is idle for 45 seconds, clear it.
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

  // function to clear the canvas after 5 minutes
  function clearBoard() {
    $('#myCanvas').fadeOut(2000, function() {
      project.clear();
      $('#myCanvas').fadeIn('slow');
    });
  }

  // set the timer to clear after 5 minutes.
  setInterval(clearBoard, 300000);
