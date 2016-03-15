var app = angular.module("MyApp", []);

angular.module("MyApp", []).
  directive('mySearchBox', function() {
    return {
      restrict: 'E',
      scope: {
        searchText: '=',
        isSearching: '='
      },
      controller: function($scope) {
        $scope.localSearchText = '';
        $scope.clearSearch = function() {
          $scope.searchText = "";
          $scope.localSearchText = "";
        };
        $scope.doSearch = function() {
          $scope.searchText = $scope.localSearchText;
        };
      },
      replace: true,
      template:
      '<form>' +
        '<div>' +
          '<input ng-model="localSearchText" type="text" />' +
        '</div>' +
        '<div>' +
          '<button ng-click="clearSearch()" class="btn btn-small">Clear</button>' +
          '<button ng-click="doSearch()"    class="btn btn-small">Search</button>' +
        '</div> ' +
        '<div ng-show="isSearching">' +
          '<img ng-show="isSearching" src="http://loadinggif.com/images/image-selection/3.gif" /> ' +
          'Searching...' +
        '</div>' +
      '</form>'
    };
  })


function ItemSearchController($scope, $timeout, $http) {
	$scope.datasets = []; //declare an empty array
	$http.get("/app/dataset.json").success(function(response){ 
		$scope.datasets = response;  //ajax request to fetch data into $scope.data
	});
  	$scope.$watch("itemSearchText", function(itemSearchText) {
    $scope.itemSearchResults = [];
    if (itemSearchText) {
      $scope.isSearchingForCities = true;
      $timeout(function() {
        // simulated search that always gives the same results
        $scope.isSearchingForCities = false;
        $scope.itemSearchResults = ['New York', 'London', 'Paris', 'Moab'];
      }, 1000);
    } else {
      $scope.isSearchingForCities = false;
    }
  });
}