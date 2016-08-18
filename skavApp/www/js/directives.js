'use strict';

app.directive('appHeader', function(){
	return {
		templateUrl: './partials/_header.html',
		controller: "HeaderController as HDC"
	};
});

app.directive('appSubheader', function(){
	return {
		templateUrl: './partials/_subheader.html',
		controller: "HeaderController as HDC"
	};
});

app.directive('appFooter', function(){
	return {
		templateUrl: './partials/_footer.html'
	};
});

app.directive('appLandingFooter', function(){
	return {
		templateUrl: './partials/_landing_footer.html'
	};
});
