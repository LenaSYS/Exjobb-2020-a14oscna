angular.module('stockTable', [])

.directive("selectNgFile", function() {
  return {
    require: "ngModel",
    link: function(scope,elem,attr,ctrlr) {
      elem.on("change", function(e) {
        var rowSize = 10000; //set number of rows to parse;
        var file = elem[0].files[0];
        var reader = new FileReader();
        
        if (file) {
          reader.readAsText(file);
          
          reader.onload = function(e) {
            var csv = e.target.result;
            var data = Papa.parse(csv, {header : true, preview: rowSize});

            data.data.forEach(x => {
              x.Kursutveckling = scope.parseNumbers(x.Kursutveckling);
              x.Direktavkastning = scope.parseNumbers(x.Direktavkastning);
              x.PE = scope.parseNumbers(x.PE);
              x.PS = scope.parseNumbers(x.PS);
              x.PB = scope.parseNumbers(x.PB);
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
  $scope.getTime = function() {
    $scope.time = performance.now();
    console.log($scope.time);
    $scope.$$postDigest(function (){
      requestAnimationFrame(()=> {
        let t = performance.now();
        console.log(t, $scope.time, t - $scope.time);
      });
    })
  }

  $scope.parseNumbers = function (s) {
    if (s == "") return s;
    return parseFloat(s);
  };

  $scope.sortData = function (column) {
    $scope.getTime();
    $scope.reverseOrder = ($scope.sortedColumn == column) ? !$scope.reverseOrder : false;
    $scope.sortedColumn = column;
    $scope.stockData = $scope.stockData.sort((a,b) => {
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
});