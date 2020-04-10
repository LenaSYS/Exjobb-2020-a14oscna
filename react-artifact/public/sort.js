document.getElementById("sortRandom").addEventListener("click", function(){  
    const iterations = 10; 
    const headers = document.getElementsByTagName("th");
    let t1, t2, num;
    
    function test(val) {
        if (val === 0) {
            return console.log("done with iteration");
        } 
        else{
            num = Math.floor(Math.random() * 13)
            t1 = performance.now(); 
            headers[num].click();
            requestAnimationFrame(()=> {
                t2 = performance.now();
                console.log(headers[num], t1, t2, t2 - t1);
                requestAnimationFrame(()=> { 
                    return test(val-1) 
                }); 
            });           
        }
    };
           
    test(iterations);
});
