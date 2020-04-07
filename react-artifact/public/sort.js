document.getElementById("sortRandom").addEventListener("click", function(){
    const headers = document.getElementsByTagName("th");
    let num;
    for (let i = 0; i < 2; i++) {
        num = Math.floor(Math.random() * 13)
        headers[num].click();     
    } // does not wait for page to render before next call.
});