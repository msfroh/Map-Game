
var placeNames = new Array();
var selectedPlace;
var svg;
var correctAnswers = 0;
var totalAnswers;

$(document).ready( function() {
	svg = $('#svginline').svg();
	svg = $('#svginline').svg('get');
        svg.load( MAP_FILE, { onLoad: loadDone } );
} );

function loadDone( svg ) {
	var locations = $('.location',svg.root());
	locations.each( function() {
		placeNames.push( $(this).attr('id') );
	} );
	placeNames.sort();
	for ( var i = 0; i < placeNames.length; i++ )
	{
		$('#placenames').append( '<span class="answer" id="' + placeNames[i] + '-label">' + placeNames[i].replace(/_/g,' ') + '</span><br />' );
		$('#' + placeNames[i] + '-label' ).click(processGuess);
	}
	totalAnswers = placeNames.length;
	randomPlace();

	svg.configure({width: undefined,
		height: undefined} );
}

function processGuess() {
	if ( (placeNames[selectedPlace] + '-label') == $(this).attr('id') )
	{
		$('#lastresult').html('Correct!');
		$('#' + placeNames[selectedPlace], svg.root() ).attr('fill','green');
		correctAnswers++;
	} else {
		$('#lastresult').html('Wrong! Correct answer was:' + placeNames[selectedPlace]);
		$('#' + placeNames[selectedPlace], svg.root() ).attr('fill','red');
	}
	placeNames.splice( selectedPlace, 1 );
	if ( placeNames.length > 0 )
	{
		randomPlace();
	} else {
		$('#lastresult').append('<br/>Total score: ' + correctAnswers + '/' + totalAnswers );
		$('span.answer').unbind( 'click' );
	}
}

function randomPlace() {
	selectedPlace = Math.floor(Math.random() * placeNames.length );
	$('#' + placeNames[selectedPlace], svg.root() ).attr('fill','black');
}
