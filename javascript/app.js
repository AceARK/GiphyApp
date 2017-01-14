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
		console.log($("#searchPhrase").val());
		console.log(buttonArray);
		buttonArray.push($("#searchPhrase").val());
		console.log(buttonArray);
		generateButtons();
	});
});

function generateButtons() {
	$("#buttonDisplay").empty();
	for(var i=0; i<buttonArray.length; i++) {
		var button = $('<button class="giphyButtons">');
		button.data("value",buttonArray[i]).text(buttonArray[i]);
		$("#buttonDisplay").append(button);
	}
}