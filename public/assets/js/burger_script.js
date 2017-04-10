$(document).ready(function(){
	var burgerSrcArray = ["/assets/img/baconMcDburger.png", "/assets/img/bbqBaconBurger.png", "/assets/img/chickenSandwich.png", "/assets/img/doubleBurger.png", "/assets/img/doubleCheeseDoubleBurgerbacon.png", "/assets/img/friedChickenSandwich.png"];
	var wrapperSrcArray = ["/assets/img/wrapper1.png", "/assets/img/wrapper2.png"];
	var usedBurgerSrcArray = [];

	// Get current timezone offset for host device
	var clientDate = new Date();
	var currentTimeZoneOffsetInHours = clientDate.getTimezoneOffset() / 60;

	// Correct time offset that comes with setting using handlebars from server
	$(".devouredOrderedDate").each(function(item) {
		// Only if program not run on local server
		if(location.href.indexOf("//localhost") === -1) {
			var time = $(this).html();
			// Subtract timezone offset of client machine to datetime object displayed by handlebars
			var timeFormattedToTimeZone = moment(time, "ll, LT").subtract(currentTimeZoneOffsetInHours, "hours");
			// Send formatted date to html
			$(this).html(moment(timeFormattedToTimeZone._d).format("ll, LT"));
		}
	});

	// Random burger pic for each new burger
	$(".readyToDevour").each(function(item) {
		if(usedBurgerSrcArray.length < burgerSrcArray.length) {
			var randomBurgerSrcIndex = Math.floor(Math.random()*burgerSrcArray.length);
			while(usedBurgerSrcArray.indexOf(randomBurgerSrcIndex) != -1) {
				randomBurgerSrcIndex = Math.floor(Math.random()*burgerSrcArray.length);
			}
			usedBurgerSrcArray.push(randomBurgerSrcIndex);
			// Setting custom burger pic for each burger
			$(this).find(".burgerPic").attr("src", burgerSrcArray[randomBurgerSrcIndex]);
		} else {
			var randomBurgerSrcIndex = Math.floor(Math.random()*burgerSrcArray.length);
			// Setting custom burger pic for each burger
			$(this).find(".burgerPic").attr("src", burgerSrcArray[randomBurgerSrcIndex]);
		}
	});

	// Wrapper pic for each devoured burger
	$(".alreadyDevoured").each(function(item) {
		var randomWrapperSrcIndex = Math.floor(Math.random()*wrapperSrcArray.length);
		
		// Setting custom wrapper pic for each devoured burger
		$(this).find(".wrapperPic").attr("src", wrapperSrcArray[randomWrapperSrcIndex]);
	});

});

