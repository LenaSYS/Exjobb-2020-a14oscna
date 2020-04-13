angular.module('stockTable', [])

.directive("selectNgFile", function() {
  return {
    require: "ngModel",
    link: function(scope,elem,attr,ctrlr) {
      elem.on("change", function(e) {
        var rowSize = 1000; //set number of rows to parse;
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
                result.data.forEach(x => {
                  x.Kursutveckling = scope.parseNumbers(x.Kursutveckling);
                  x.Direktavkastning = scope.parseNumbers(x.Direktavkastning);
                  x.PE = scope.parseNumbers(x.PE);
                  x.PS = scope.parseNumbers(x.PS);
                  x.PB = scope.parseNumbers(x.PB);
                });
              }
            });
            scope.stockHead = data.meta.fields;
            scope.filteredStockData = data.data;
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
  $scope.filterText = "";

  $scope.parseNumbers = function (s) {
    if (s == "") return s;
    return parseFloat(s);
  };

  $scope.sortData = function (column) {
    $scope.reverseOrder = ($scope.sortedColumn == column) ? !$scope.reverseOrder : false;
    $scope.sortedColumn = column;
    $scope.filteredStockData = $scope.filteredStockData.sort((a,b) => {
          let x, y;

          if(typeof(a[column]) === "string" && typeof(b[column]) === "string") {
              x = a[column].toUpperCase();
              y = b[column].toUpperCase();
          }
          else{
              x = a[column];
              y = b[column];
          }

          if(this.reverseOrder) {
              return (x < y) ? 1 : -1;  
          }
          else {
              return (x > y) ? 1 : -1;   
          }            
      })
  };

  $scope.filterData = function (data, string) {
    if (!data) return null;
    
    const filteredBody = data.filter(x => { 
      for (let val in x) {
          if (typeof(x[val]) === "string") 
          {
              if (x[val].toUpperCase().indexOf(string.toUpperCase()) !== -1) return true;
          } 
          else 
          {
              if (x[val].toString().indexOf(string) !== -1) return true;
          }          
      } 
      return false;
    });
    return $scope.filteredStockData = filteredBody;
  }
});