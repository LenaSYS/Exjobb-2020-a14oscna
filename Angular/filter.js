document.getElementById("filterRandom").addEventListener("click", function(){ 
    const s = [
        'Mid', '88', 'Dagligvaror', 'Industri',
        'Finans', 'Hälsovård', '35', 'ban', "Livsmedel",
        '0.0', '55', 'Sv', 'rustning', 'Danmark', 
        '26', 'Small', 'te', 'North', 'ö', 
        'Informationsteknik', 'ak', 'Norge', 'Large', 'ice'
    ]   
    const iterations = 10; 
    const srch = document.getElementById("searchBox");
    const srchProtoObj = Object.getPrototypeOf(srch);
    const nativeValue = Object.getOwnPropertyDescriptor(srchProtoObj, "value").set;
    const inputEvent = new Event('input', { bubbles: true });
    let t1, t2, result = [];
    Math.seedrandom('a14oscna');

    function test(val) {
        if (val === 0) {
            return console.log(result);
        } 
        else{       
            nativeValue.call(srch, s[Math.floor(Math.random()*s.length)]);
            t1 = performance.now();
            srch.dispatchEvent(inputEvent);           
            
            requestAnimationFrame(()=> {
                t2 = performance.now();
                result.push(t2 - t1);
                
                requestAnimationFrame(()=> { 
                    return test(val-1) 
                }); 
            }); 
        }       
    };        
    test(iterations);
});