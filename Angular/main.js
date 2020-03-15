angular.module('stockTable', [])

.directive("selectNgFile", function() {
  return {
    require: "ngModel",
    link: function(scope,elem,attrs,ngModel) {
      elem.on("change", function(e) {
        var rowSize = 100;
        var file = elem[0].files[0];
        var reader = new FileReader();
        if (file) {
          reader.readAsText(file);
          reader.onload = function(e) {
            var csv = e.target.result;
            var data = Papa.parse(csv, {header : true, preview: rowSize});
            scope.stockHead = data.meta.fields
            ngModel.$setViewValue(data.data);
          };
        }
      })
    }
  }
})
.controller('tableController', function($scope) {    
});