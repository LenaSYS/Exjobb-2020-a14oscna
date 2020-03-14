angular.module('stockTable', [])
  .controller('tableController', function($scope) {
    $scope.frameworkName = 'AngularJS'; //will remove later, was only for testing purposes
      $scope.upload = function(file) {
        var file = file.files[0];
        var reader = new FileReader();
        if (file) {
          reader.readAsText(file);
          reader.onload = function(e) {
            var csv = e.target.result;
            var data = Papa.parse(csv, {header : true, encoding: "utf-8", preview: 10});
            $scope.dataHead = data.meta.fields;
            $scope.dataBody = data.data;
          };
        }
      }

      $scope.updateTable = function() {
        $scope.thead = $scope.dataHead;
        $scope.tbody = $scope.dataBody;
        console.log($scope.tbody);
        console.log($scope.thead);
      };      
  });