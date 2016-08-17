'use strict';

app.directive('appHeader', function(){
	return {
		templateUrl: '/partials/_header.html'
	};
});

app.directive('appUserFooter', function(){
	return {
		templateUrl: '/partials/_user_footer.html'
	};
});

app.directive('appAdminFooter', function(){
	return {
		templateUrl: '/partials/_admin_footer.html'
	};
});

app.directive('appLandingFooter', function(){
	return {
		templateUrl: '/partials/_landing_footer.html'
	};
});
