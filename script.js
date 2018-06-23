var blogApp = angular.module('blogApp', ['ngRoute']);

blogApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/posts.html',
			controller: 'blogAppController'
		})
		.when('/new_post', {
			templateUrl: 'views/new_post.html',
			controller: 'blogAppController'
		}).otherwise({
			redirectTo: '/'
		});
}]);

blogApp.controller('blogAppController', function($scope, $http, $window){
	$scope.posts = [];
	$http.get('https://api.mlab.com/api/1/databases/f4rase/collections/posts?apiKey=6LKk_WnDz-O1HoOrNN7Ia8TIGbkibCQG')
	.then(function(response){
		$scope.posts = response.data;
		console.log(response.data);
	});

	$scope.postData = function(params){
		$http.post("https://api.mlab.com/api/1/databases/f4rase/collections/posts?apiKey=6LKk_WnDz-O1HoOrNN7Ia8TIGbkibCQG", {title: params.title, post: params.content})
		.then(function(response){
			console.log('data published');
		})
		.then(function(){
			$window.location.href = "#";
		});
	}
});
