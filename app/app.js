var app = angular.module('angularTable', ['angularUtils.directives.dirPagination']);

app.controller('listdata',function($scope, $http){
	$scope.datasets = []; //declare an empty array
	$http.get("/app/dataset.json").success(function(response){ 
		$scope.datasets = response;  //ajax request to fetch data into $scope.data
	});
	
	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	};
});

app.controller('alertController', ['$scope', '$window', function($scope, $window) {
	$scope.example_popup = function(item){
 		var w = window.open('', '_blank', 'width=820,height=800,resizeable,scrollbars');
 		w.focus();
 		w.document.write(toString(item));
		w.document.close(); // needed for chrome and safari
		};
    }]);




function toString(item){
		var result = '<!doctype html><html lang="en">' + 
		'<head><meta charset="utf-8"><title>Search Crowdsourcing Datasets</title>'+
	    // '<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">' + 
    	// '<link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css">' +
 	    '<link rel="stylesheet" type="text/css" href="css/itempagestyle.css"></head>'+
 	    '<body>' +
 		'<h1>Detail Information For Dataset</h1>' +
 		'<div id = "content"><div id = "subheader">'+
      	'<h2>'+String(item.title)+'</h2>'+
      	'<h3>Labels: ' + String(item.labels) + '</h3>' +
      	'<a href="' + String(item.link) + '"> Download Data</a></div><p></p>' +
      	'<table class="table-fill"><tbody class="table-hover">' +
      	'<tr>' +
      		'<td colspan="3">Task:</td><td>' + String(item.task) + '</td>'+
      		'<td colspan="3">Type:</td><td>' + String(item.data_type) +'</td>'+
      	'</tr>'+
      	'<tr>' +
      		'<td colspan="3">Marketplace:</td><td>' + String(item.marketplace) + '</td>'+
      		'<td colspan="3">Worker Demographic Info Available:</td><td>' + toNY(item.wkr_demo) +'</td>' +
      	'</tr>'+ 
      	'<tr>' +
      		'<td colspan="3">Payment Info Available:</td><td>' + toNY(item.payment)+ '</td>'+
      		'<td colspan="3">Bonus Info Available:</td><td>'+ toNY(item.bonus) + '</td>'+
      	'</tr>'+
      	'<tr>' + 
      		'<td colspan="3">Is Ground Truth:</td><td>' + toNY(item.grd_truth) + '</td>'+
      		'<td colspan="3">Task Description Available:</td><td>' + toNY(item.dscrp) + '</td>'+
      	'</tr>'+ 
      	'<tr>' +
	      	'<td colspan="3">Latency Info Available:</td><td>' + toNY(item.ltc_info) + '</td>'+
	      	'<td colspan="3">Related Source Available:</td><td>' + toNY(item.scr) +'</td>'+
      	'</tr>'+
      	'</tbody></table>'+
      	'<div><h3>Description:</h3><p>'+ String(item.spec) + '</p></div>'
      	'</div></body></html>'
	return result;
}

function toNY(bool){
	if(bool) return 'yes';
	else return 'no';
}

app.directive("myWidget", function() {
  return {
    restrict: "E",
    template: "<div>Hello World</div>"
  };
});
