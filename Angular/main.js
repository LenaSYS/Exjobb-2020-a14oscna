angular.module('stockTable', [])
  .controller('tableController', function() {
    var table = this;
    table.content = [
      {date:'2020-03-10', name:'Volvo', value: 50},
      {date:'2020-03-11', name:'Audi', value: 180},
      {date:'2020-03-13', name:'Jeep', value: 320},
      {date:'2020-03-19', name:'Fiat', value: 500},
      {date:'2020-03-10', name:'Tesla', value: 1000}];
  });