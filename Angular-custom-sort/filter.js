/* function setFilter() {
    const rows = document.getElementsByTagName("tr").length;
    document.getElementById("setFilter").style.backgroundColor = "green"; */
    const s = [
        'Large', 'Mid', 'Small', 'Dagligvaror', 'Industri', 'Finans',
        'Hälsovård', 'Informationsteknik', ""
    ]

    document.getElementById("filterRandom").addEventListener("click", function(){  
        const num = Math.floor(Math.random() * s.length)
        document.getElementById("searchBox").value = s[num];
        document.getElementById("searchBox").dispatchEvent()
        /* const num = Math.ceil(Math.random() * (rows-1))
        console.log(num)
        console.log(rows) */

        /*var t1 = performance.now();
        headers[num].click();
        var t2 = performance.now();
        console.log("Filtering took " + (t2 - t1) + " milliseconds to complete."); */
    });
/* }; */