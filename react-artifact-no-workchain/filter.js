document.getElementById("filterRandom").addEventListener("click", function(){ 
  const s = [
    'Mid', '88', 'Da', 'Industri', 'ot',
    'Finans', 'Hälsovård', '35', 'ban', "Livsmedel",
    '0.0', '55', 'Sv', 'rustning', "spe", 
    '26', 'Sma', 'te', 'Nor', 'ö', 
    'in', 'ak', 'f', 'le', 'ice',
    '43', '71', '333', '00', '69',
    '420', '54', 'ta', 're', 'po',
    '92', '31', '999', 'di', 'am',
    'tech', 'el', '11', 'j', 'w',
    'ä', 'ar', '25', '47', '087'
  ]   
  const iterations = 1000; 
  const srch = document.getElementById("searchBox");
  const srchProtoObj = Object.getPrototypeOf(srch);
  const nativeValue = Object.getOwnPropertyDescriptor(srchProtoObj, "value").set;
  const inputEvent = new Event('input', { bubbles: true });
  let t1, t2, newRand = -1, oldRand = -1, result = [];
  Math.seedrandom('a14oscna');

  function test(val) {
    if (val === 0) {
      return console.log(result);
    } 
    else{
      while (oldRand === newRand) {
        newRand = Math.floor(Math.random()*s.length)    
      } 
      nativeValue.call(srch, s[newRand]);
      t1 = performance.now();
      srch.dispatchEvent(inputEvent);           
      
      requestAnimationFrame(()=> {
        t2 = performance.now();
        oldRand = newRand;
        result.push(t2 - t1);
        
        requestAnimationFrame(()=> { 
          return test(val-1) 
        }); 
      }); 
    }       
  };        
  test(iterations);
});