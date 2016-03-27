'use strict';
var app = angular.module('myApp', ['ngTable','ngResource']);

app.controller('tableController',function($scope, $http, $filter, ngTableParams){
  $scope.datasets = [];
  $scope.showdata = [];
  var spreadsheetID = "1oegAgIuzL7s1-7WdPKfMkIPGSrOkihvO3AA7_SSLp9Q";
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  $.getJSON(url, function(data) {
 
  var entry = data.feed.entry;
 
  $(entry).each(function(){
    // Column names are name, age, etc.
    $('.results').prepend('<h2>'+this.gsx$bonus+'</h2><p>'+this.gsx$title+'</p>');
    var dataset = {};
    var title = this.gsx$datasetname.$t;
    var type = this.gsx$typeofdata.$t;
    var task = this.gsx$typeoftask.$t;
    var marketplace = this.gsx$marketplace.$t;
    var wkr_demo = this.gsx$workerdemographic.$t;
    // exclude second line and not valid ones
    if(wkr_demo.length > 1) return;
    var payment = this.gsx$payment.$t;
    var bonus = this.gsx$bonus.$t;
    var grd_truth = this.gsx$groundtruth.$t;
    var spec = this.gsx$taskspec.$t;
    var ltc = this.gsx$latencyinformation.$t;
    var source = this.gsx$relatedsource.$t;
    var link = this.gsx$downloadlink.$t;
    var discription = this.gsx$detaileddescription.$t;


    // check data schema
    if(title.length > 0 && link.length > 0){
      dataset['title'] = title;
      dataset['data_type'] = type;
      dataset['task'] = task;
      dataset['marketplace'] = marketplace;
      dataset['link'] = link;
      if(angular.equals(wkr_demo.toString,'1'))
        dataset['wkr_demo'] = true;
      else
        dataset['wkr_demo'] = false;
      if(angular.equals(payment.toString,'1'))
        dataset['payment'] = true;
      else
        dataset['payment'] = false;
      if(angular.equals(bonus.toString,'1'))
        dataset['bonus'] = true;
      else
        dataset['bonus'] = false;
      if(angular.equals(grd_truth.toString,'1'))
        dataset['grd_truth'] = true;
      else
        dataset['grd_truth'] = false;
      if(angular.equals(spec.toString,'1'))
        dataset['dscrp'] = true;
      else
        dataset['dscrp'] = false;
      if(angular.equals(ltc.toString,'1'))
        dataset['ltc_info'] = true;
      else
        dataset['ltc_info'] = false;
      dataset['scr'] = source;
      dataset['spec'] = discription;
      $scope.datasets.push(dataset);
      $scope.showdata.push(dataset);
    }
  });
 
 });
	// $scope.datasets = []; //declare an empty array
	// $http.get("/app/dataset.json").success(function(response){ 
 //    $scope.showdata = response;  //initializing web with all datasets
	// 	$scope.datasets = response;  //ajax request to fetch data into $scope.data
	// });

// filter options for column filtering
  $scope.types = [{id: "text", title:"text"},
  {id:"image",title:"image"},
  {id:"video",title:"video"},
  {id:"other",title:"other"}]
	
  $scope.tasks = [{id:"sort", title:"sort"},
  {id:"cluster",title:"cluster"},
  {id:"search",title:"search"},
  {id:"rating",title:"rating"},
  {id:"filtering",title:"filtering"},
  {id:"counting",title:"counting"},
  {id:"entity resolution", title:"entity resolution"},
  {id:"max", title:"max"},
  {id:"other",title:"other"}]


  $scope.datasetsTable = new ngTableParams(
    {
      page:1,
      count:$scope.datasets.length
    },
    {
      total: 1,
      getData: function ($defer, params) {
        $scope.data = $scope.datasets;
        $scope.data = params.sorting() ? $filter('orderBy')($scope.datasets, params.orderBy()) : $scope.datasets;
        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
        $scope.showdata = $scope.data;
        // $scope.showdata = $scope.data.slice(0,100);
        // $defer.resolve($scope.data);
        }
  });

  $scope.getMoreData = function () {
    $scope.showdata = $scope.data.slice(0, $scope.data.length + 100);
  }


  $scope.wkrFilter = [];
  $scope.paymentFilter = [];
  $scope.bonusFilter = [];
  $scope.gtFilter = [];
  $scope.dscrpFilter = [];
  $scope.ltcFilter = [];
  $scope.srcFilter = [];

  $scope.hidenAttr = function(attribute, value){
    if(angular.equals(attribute, 'wkr')){
      var i = $.inArray(value, $scope.wkrFilter);
      if(i > -1){
        $scope.wkrFilter.splice(i,1);
      } else{
        $scope.wkrFilter.push(value);
      }
    }
    else if(angular.equals(attribute, 'payment')){
      var i = $.inArray(value, $scope.paymentFilter);
      if(i > -1){
        $scope.paymentFilter.splice(i,1);
      } else{
        $scope.paymentFilter.push(value);
      }
    }
    else if(angular.equals(attribute, 'bonus')){
      var i = $.inArray(value, $scope.bonus);
      if(i > -1){
        $scope.bonusFilter.splice(i,1);
      } else{
        $scope.bonusFilter.push(value);
      }
    }
    else if(angular.equals(attribute, 'gt')){
      var i = $.inArray(value, $scope.gtFilter);
      if(i > -1){
        $scope.gtFilter.splice(i,1);
      } else{
        $scope.gtFilter.push(value);
      }
    }
    else if(angular.equals(attribute, 'dscrp')){
      var i = $.inArray(value, $scope.dscrpFilter);
      if(i > -1){
        $scope.dscrpFilter.splice(i,1);
      } else{
        $scope.dscrpFilter.push(value);
      }
    }
    else if(angular.equals(attribute, 'ltc')){
      var i = $.inArray(value, $scope.ltcFilter);
      if(i > -1){
        $scope.ltcFilter.splice(i,1);
      } else{
        $scope.ltcFilter.push(value);
      }
    }
    else if(angular.equals(attribute, 'src')){
      var i = $.inArray(value, $scope.srcFilter);
      if(i > -1){
        $scope.srcFilter.splice(i,1);
      } else{
        $scope.srcFilter.push(value);
      }
    }
  }

  $scope.hidenAttrFilter = function(dataset) {
      // if wkrInfo filter is active
      if($scope.wkrFilter.length > 0 && $.inArray('all',$scope.wkrFilter) < 0){
        var wkr = dataset.wkr_demo
        if(wkr && $.inArray('true',$scope.wkrFilter) < 0)
          return;
        else if(!wkr && $.inArray('false',$scope.wkrFilter) < 0)
          return;
      }
      // if filter is active, etc....
      if($scope.paymentFilter.length > 0 && $.inArray('all',$scope.paymentFilter) < 0){
        var pay = dataset.payment
        if(pay && $.inArray('true',$scope.paymentFilter) < 0)
          return;
        else if(!pay && $.inArray('false',$scope.paymentFilter) < 0)
          return;
      }
      if($scope.bonusFilter.length > 0 && $.inArray('all',$scope.bonusFilter) < 0){
        var bns = dataset.bonus
        if(bns && $.inArray('true',$scope.bonusFilter) < 0)
          return;
        else if(!bns && $.inArray('false',$scope.bonusFilter) < 0)
          return;
      }
      if($scope.gtFilter.length > 0 && $.inArray('all',$scope.gtFilter) < 0){
        var gt = dataset.grd_truth
        if(gt && $.inArray('true',$scope.gtFilter) < 0)
          return;
        else if(!gt && $.inArray('false',$scope.gtFilter) < 0)
          return;
      }
      if($scope.dscrpFilter.length > 0 && $.inArray('all',$scope.dscrpFilter) < 0){
        var discription = dataset.dscrp
        if(discription && $.inArray('true',$scope.dscrpFilter) < 0)
          return;
        else if(!discription && $.inArray('false',$scope.dscrpFilter) < 0)
          return;
      }
      if($scope.ltcFilter.length > 0 && $.inArray('all',$scope.ltcFilter) < 0){
        var latency = dataset.ltc_info
        if(latency && $.inArray('true',$scope.ltcFilter) < 0)
          return;
        else if(!latency && $.inArray('false',$scope.ltcFilter) < 0)
          return;
      }
      if($scope.srcFilter.length > 0 && $.inArray('all',$scope.srcFilter) < 0){
        var source = dataset.dscrp
        if(source && $.inArray('true',$scope.srcFilter) < 0)
          return;
        else if(!source && $.inArray('false',$scope.srcFilter) < 0)
          return;
      }
      // console.log(dataset);
      return dataset;
  }


});



//from then on: showing description page in a new window/tab

app.controller('alertController', ['$scope', '$window', function($scope, $window) {
	$scope.show_detail = function(item){
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
	if(bool) return 'Yes';
	else return 'No';
}
