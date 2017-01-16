// Pseudocode
// Buttons array with words, on load of page, call function that displays all words as buttons
// Generate button on click, should add the words in input field to array, and call function to generate buttons in buttonDisplay div
// Clear button that clears giphys in giphyDisplay div
var topics = ["bubbles","rainbow","moon","unicorn","stars","plush","twinkle","pink","shiny shoes","dancing","kittens","puppies"];
var randomIndex = 0;
var usedRandomIndex = [];

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
		randomIndex = 0;
		usedRandomIndex = [];
		getGiphys(buttonData);
		$("#searchPhrase").val("");
	});
}

function getGiphys(searchTerm) {
	// PseudoCode change: Using random indices to select 10 random gifs from 100 gifs got via ajax call 
	// ** I got bored seeing same ones over and over again; Why wouldn't the users? **
	var queryURL = "http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&limit=100&rating=pg&q=" + searchTerm;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		$("#giphyDisplay").empty();
		console.log(response);
		var responseData = response.data;
		// Looping 10 times for 10 gifs
		for(var i=0; i<10; i++) {
			// Getting a random index that has not been used before 
			randomIndex = Math.floor(Math.random()*responseData.length);
			while(usedRandomIndex.indexOf(randomIndex) != -1) {
				randomIndex = Math.floor(Math.random()*responseData.length);
			}
			usedRandomIndex.push(randomIndex);
			// Creating gif divs to hold giphy
			var giphyDiv = $('<div class="giphyDiv">');
			var giphy = $('<img class ="giphyImage img-responsive">');
			giphy.attr({"data-still":responseData[randomIndex].images.downsized_still.url, "data-animated":responseData[randomIndex].images.downsized.url, "data-state":"still"});
			giphy.attr('src',responseData[randomIndex].images.downsized_still.url);
			giphyDiv.append(giphy);
			giphyDiv.append("<p>Gif Rating: " + responseData[randomIndex].rating + "</p>");
			$('#giphyDisplay').append(giphyDiv);
		}
		$(".giphyImage").off("click").on("click", function() {
			console.log("entering click function");
			$(this).attr('data-state', $(this).attr('data-state') == 'still' ? 'animated' : 'still');
			$(this).attr('src', $(this).attr('data-state') == 'still' ? $(this).attr('data-still') : $(this).attr('data-animated'));

		});
	});
}