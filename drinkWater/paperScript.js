//draw the raindrop bottom
    var arc = new Path.Arc(new Point(320, 380), new Point(400, 500), new Point(480, 380));
    // draw the raindrop tip
    var rainTip = new Path();
    rainTip.add(new Point(320, 380));
    rainTip.add(new Point(400, 250));
    rainTip.add(new Point(480, 380))
    rainTip.closed = true;
    // put them together in a group so it becomes 1 object.
    var raindrop = new Group ({
      children: [arc, rainTip],
      position: view.center,
      fillColor: {
        gradient: {
            stops: ['#93C0DB', '#67A1C2', '#436FD4']
        },
        origin: (view.center - [30, 45]),
        destination: (view.center + [30, 50])
      }
    });
    // make raindrop a symbol, that way you can make several
    var raindrops = new Symbol(raindrop);
    raindrop.remove();
    var numOfDrops = 55;

    //create a loop that randomizes 55 drops in size, angle and placement
    for(var i = 0; i < numOfDrops; i++) {
      var firstDrop = raindrops.place();
      firstDrop.position = Point.random() * view.size;

      firstDrop.rotate(Math.random() * 45);
      firstDrop.scale(0.25 + Math.random() * 0.45);
    }
    //make it rain
    function onFrame(event) {
      for( var i = 0; i < numOfDrops; i++) {
        var drop = project.activeLayer.children[i];
        drop.position.y += drop.bounds.height / 35;
        if(drop.bounds.bottom > (view.size.height + 100)) {
            drop.position.y = -drop.bounds.height;
        }
      }
    }
