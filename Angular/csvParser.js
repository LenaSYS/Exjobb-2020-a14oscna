document.getElementById('csvUpload').addEventListener('change', upload);
 
/* This file is saved as back-up in case my full angular solution does not work */

 function upload(e) {
 var file = e.target.files[0];
 var reader = new FileReader();
 if (file) {
  reader.readAsText(file);
  reader.onload = function(e) {
  var csv = e.target.result;
  var data = Papa.parse(csv, {header : true, encoding: "utf-8", preview: 10});
  
  console.log(data.meta.fields);
  
  };
 }
}