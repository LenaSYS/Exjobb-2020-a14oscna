document.getElementById("sortRandom").addEventListener("click", function(){
    const headers = document.getElementsByTagName("th");
    const num = Math.floor(Math.random() * 13)
    var t1 = performance.now();
    headers[num].click();
    var t2 = performance.now();
    console.log("Sorting took " + (t2 - t1) + " milliseconds to complete.");
});