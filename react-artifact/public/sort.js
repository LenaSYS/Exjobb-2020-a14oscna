document.getElementById("sortRandom").addEventListener("click", function(){  
    const iterations = 100; 
    const headers = document.getElementsByTagName("th");
    let t1, t2, result = [];
    
    function test(val) {
        if (val === 0) {
            return console.log(result);
        } 
        else{
            t1 = performance.now(); 
            headers[val % 10].click();
            
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