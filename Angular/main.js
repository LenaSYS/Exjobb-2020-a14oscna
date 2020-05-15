angular.module('stockTable', [])

.directive("selectNgFile", function() {
  return {
    require: "ngModel",
    link: function(scope,elem,attr,ctrlr) {
      elem.on("change", function(e) {
        var rowSize = 10000;
        var file = elem[0].files[0];
        var reader = new FileReader();
        
        if (file) {
          reader.readAsText(file);
          
          reader.onload = function(e) {
            var csv = e.target.result;
            var data = Papa.parse(csv, {
              header : true, 
              preview: rowSize,
              complete: function(result){
                result.data.forEach(row => {
                  Object.keys(row).forEach(col => {
                    if (!isNaN(row[col])) {
                      row[col] = parseFloat(row[col])
                    }
                  });
                });
              }
            });
            scope.stockHead = data.meta.fields;
            ctrlr.$setViewValue(data.data);
          };
        }
      })
    }
  }
})
.controller('tableController', function($scope) {    
  $scope.sortedColumn = "Bolagsnamn";
  $scope.reverseOrder = false;

  $scope.sortData = function (column) {
    $scope.reverseOrder = ($scope.sortedColumn == column) ? !$scope.reverseOrder : false;
    $scope.sortedColumn = column;
  };
});