angular.module('stockTable', [])

.directive("selectNgFile", function() {
  return {
    require: "ngModel",
    link: function(scope,elem,attrs,ngModel) {
      elem.on("change", function(e) {
        var rowSize = 10;
        var file = elem[0].files[0];
        var reader = new FileReader();
        if (file) {
          reader.readAsText(file);
          reader.onload = function(e) {
            var csv = e.target.result;
            var data = Papa.parse(csv, {header : true, preview: rowSize});
            data.meta.fields.unshift("Index"); //will be removed later

            data.data.forEach(x => {
              x.Kursutveckling = scope.parseNumbers(x.Kursutveckling);
              x.Direktavkastning = scope.parseNumbers(x.Direktavkastning);
              x.PE = scope.parseNumbers(x.PE);
              x.PS = scope.parseNumbers(x.PS);
              x.PB = scope.parseNumbers(x.PB);
            });

            scope.stockHead = data.meta.fields;
            ngModel.$setViewValue(data.data);
            console.log(scope);
            console.log(data.data);
          };
        }
      })
    }
  }
})
.controller('tableController', function($scope) {    
  $scope.sortedColumn = "Bolagsnamn";
  $scope.reverseOrder = false;

  $scope.parseNumbers = function (s) {
    if (s == "") return s;
    return parseFloat(s);
  };

  $scope.sortData = function (column) {
    $scope.reverseOrder = ($scope.sortedColumn == column) ? !$scope.reverseOrder : false;
    $scope.sortedColumn = column;
    console.log(column);
  };
});