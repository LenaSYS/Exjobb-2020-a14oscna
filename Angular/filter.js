document.getElementById("filterRandom").addEventListener("click", function(){ 
    const s = [
        'Large', 'Mid', 'Small', 'Dagligvaror', 'Industri', 'Finans',
        'Hälsovård', 'Informationsteknik', "", "Livsmedel"
    ]   
    const iterations = 10; 
    const srch = document.getElementById("searchBox");
    const srchProtoObj = Object.getPrototypeOf(srch);
    const nativeValue = Object.getOwnPropertyDescriptor(srchProtoObj, "value").set;
    const inputEvent = new Event('input', { bubbles: true });
    let t1, t2, num, result = [];

    function test(val) {
        if (val === 0) {
            return console.log("done with iteration", result);
        } 
        else{
            num = Math.floor(Math.random() * s.length)          
            nativeValue.call(srch, s[num]);
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