// Pseudocode
// Buttons array with words, on load of page, call function that displays all words as buttons
// Generate button on click, should add the words in input field to array, and call function to generate buttons in buttonDisplay div
// Button.on click should make ajax call to giphy and get 10 giphys in giphyDisplay 
// Clear button that clears giphys in giphyDisplay div
var topics = ["stars","kitten","moon","wolf","lilies","Supernatural","keys","tiger","tortoise","coffee","orange","green","blue","violet"];

$(document).ready(function(event) {
	generateButtons();
	$("#addToButtons").on("click", function(clickEvent) {
		if($("#searchPhrase").val()) {
			clickEvent.preventDefault();
			topics.push($("#searchPhrase").val());
			generateButtons();
		}
	});

	$("#clearDisplay").on("click", function(clickEvent) {
		clickEvent.preventDefault();
		$("#giphyDisplay").empty(); // avoiding using function clearDiv here since no other functionality is executed on clear i.e this is shorter
	})

});

function generateButtons() {
	$("#buttonDisplay").empty();
	for(var i=0; i<topics.length; i++) {
		var button = $('<button class="giphyButtons button btn-2 btn-2c">');
		button.data("value",topics[i]).text(topics[i]);
		$("#buttonDisplay").append(button);
	}
	$(".giphyButtons").off("click").on("click", function() {
		var buttonData = $(this).data("value");
		getGiphys(buttonData);
		$("#searchPhrase").val("");
	});
}

function getGiphys(searchTerm) {
	var queryURL = "http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&limit=10&rating=pg&q=" + searchTerm;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		$("#giphyDisplay").empty();
		console.log(response);
		var responseData = response.data;
		for(var i=0; i<10; i++) {
			var giphyDiv = $('<div class="giphyDiv">');
			var giphy = $('<img class ="giphyImage img-responsive">');
			giphy.attr({"data-still":responseData[i].images.original_still.url, "data-animated":responseData[i].images.original.url, "data-state":"still"});
			giphy.attr('src',responseData[i].images.original_still.url);
			giphyDiv.append(giphy);
			giphyDiv.append("<p>" + responseData[i].rating + "</p>");
			$('#giphyDisplay').append(giphyDiv);
		}
		$(".giphyImage").off("click").on("click", function() {
			console.log("entering click function");
			$(this).attr('data-state', $(this).attr('data-state') == 'still' ? 'animated' : 'still');
			$(this).attr('src', $(this).attr('data-state') == 'still' ? $(this).attr('data-still') : $(this).attr('data-animated'));

		});
	});
}