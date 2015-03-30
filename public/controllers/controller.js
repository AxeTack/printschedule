var printScheduleApp = angular.module('printScheduleApp', [ 'ui.bootstrap.tpls' ]);
printScheduleApp.controller('ScheduleCtrl', ['$scope', '$http', function($scope, $http) {

	console.log('Hello World from controller');
	
	var refesh = function () {
		$http.get('/contactlist').success(function (response) {
			console.log('I got the data I requested');
			$scope.contactlist = response;
			$scope.contact = "";

		});
	};

	refesh();

	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function (response) {
			console.log(response);
			refesh();
		});
	};

}]);