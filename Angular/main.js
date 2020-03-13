angular.module('stockTable', [])
  .controller('tableController', function($scope, $rootScope) {
    $rootScope.frameworkName = 'AngularJS';
    $scope.content = [
      {date:'2020-03-10', name:'Volvo', value: 50},
      {date:'2020-03-11', name:'Audi', value: 180},
      {date:'2020-03-13', name:'Jeep', value: 320},
      {date:'2020-03-19', name:'Fiat', value: 500},
      {date:'2020-03-10', name:'Tesla', value: 1000}];
  })
  
  .controller('fileController', function($scope, $rootScope) {
    $scope.upload = function(file) {
      var file = file.files[0];
      var reader = new FileReader();
      if (file) {
        reader.readAsText(file);
        reader.onload = function(e) {
        var csv = e.target.result;
        var data = Papa.parse(csv, {header : true, encoding: "utf-8", preview: 10});
        
          $rootScope.datasetBody = data.data;
          $rootScope.datasetHead = data.meta.fields;
          console.log($rootScope.datasetHead)
        };
      }
    }
  });