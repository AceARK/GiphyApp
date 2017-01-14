// Pseudocode
// Buttons array with words, on load of page, call function that displays all words as buttons
// Generate button on click, should add the words in input field to array, and call function to generate buttons in buttonDisplay div
// Button.on click should make ajax call to giphy and get 10 giphys in giphyDisplay 
// Clear button that clears giphys in giphyDisplay div
var buttonArray = ["Star Wars","Terminator","X-men","Avengers","Transformers","Supernatural","Fringe","Lost","Jurassic Park","Guardians of The Galaxy"];

$(document).ready(function(event) {
	generateButtons();
	$("#addToButtons").on("click", function(clickEvent){
		clickEvent.preventDefault();
		buttonArray.push($("#searchPhrase").val());
		generateButtons();
	});

	$(".giphyButtons").on("click", function() {
		// get button data value 
		// put value as query term in ajax search function
		var buttonData = $(this).data("value");
		getGiphys(buttonData);
	})
});

function generateButtons() {
	$("#buttonDisplay").empty();
	for(var i=0; i<buttonArray.length; i++) {
		var button = $('<button class="giphyButtons">');
		button.data("value",buttonArray[i]).text(buttonArray[i]);
		$("#buttonDisplay").append(button);
	}
}

function getGiphys(searchTerm) {
	var queryURL = "http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&limit=20&q=" + searchTerm;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		console.log(response);
		var responseData = response.data;
		for(var i=0; i<10; i++) {
			if(responseData[i].rating !== 'r' && responseData[i].rating !== 'pg-13') {
				var giphyDiv = $('<div class="giphyDiv">');
				var giphy = $('<img class ="giphyImage">');
				giphy.attr('src',responseData[i].images.fixed_height_downsampled.url);
				giphyDiv.append(giphy);
				giphyDiv.append("<p>" + responseData[i].rating + "</p>");
				$('#giphyDisplay').append(giphyDiv);
			}
		}
	});

}