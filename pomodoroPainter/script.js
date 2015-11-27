$(document).ready(function() {
  $.ajax({
    url: '/paintScript.js',
    dataType: 'script'
  })
	$('#myCanvas').load('paperScript.js');

})
