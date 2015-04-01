var printScheduleApp = angular.module('printScheduleApp', [ 'ngRoute', 'ui.bootstrap' ]);

//Routes
printScheduleApp.config(function ($routeProvider) { 
    
    $routeProvider
    	.when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/schedule', {
            templateUrl: 'views/table.html'
        })
        .otherwise( { 
        	redirecTo: '/'
        });

});

//NavBarCtrl
printScheduleApp.controller('NavBarCtrl', function($scope) { 
	console.log('Hello World from NavBarCtrl');
	$scope.isCollapsed = true;
});

//ScheduleCtrl
printScheduleApp.controller('ScheduleCtrl', ['$scope', '$http', function($scope, $http) {

	console.log('Hello World from ScheduleCtrl');
	
	$scope.isUpdateOnTheWay = false;	

	var refresh = function () {
		$http.get('/contactlist').success(function (response) {
			console.log('I got the data I requested');
			$scope.contactlist = response;
			$scope.contact = "";
			$scope.isUpdateOnTheWay = false;
		});
	};

	refresh();

	$scope.add = function() {
		console.log($scope.contact);
		$scope.isUpdateOnTheWay = false;
		if ($scope.contact) {		
			$http.post('/contactlist', $scope.contact).success(function (response) {
				console.log(response);
				refresh();
			});	
		}
	};

	$scope.remove = function (id) {
		console.log(id);	
		$http.delete('/contactlist/' + id).success(function (response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		console.log(id);
		$scope.isUpdateOnTheWay = true;
		$http.get('/contactlist/' + id).success(function (response) {
			$scope.contact = response;
		});
	};

	$scope.update = function() {
		console.log($scope.contact._id);
		$scope.isUpdateOnTheWay = true;
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.isUpdateOnTheWay = false;
		$scope.contact = "";
	};

}]);