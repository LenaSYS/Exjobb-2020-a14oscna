document.getElementById("sortRandom").addEventListener("click", function(){  
    const iterations = 1000; 
    const headers = document.getElementsByTagName("th");
    let t1, t2, random = -1, result = [];
    Math.seedrandom('a14oscna');
    
    function test(val) {
        if (val === 0) {
            return console.log(result);
        } 
        else{            
            random = Math.floor(Math.random()*headers.length)
            t1 = performance.now(); 
            headers[random].click();
            
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