
 
chrome.extension.sendMessage({}, function(response) {


    var audio = new Audio('http://memberfiles.freewebs.com/20/20/67812020/podcast/John%20Cena%20-%20Your%20time%20is%20up.mp3');
    audio.play();


    var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
 
        var images = document.querySelectorAll("img");
        var imageList = ["http://worldinsport.com/wp-content/uploads/2014/08/johncena.jpg",
                        "http://www.inspirationluv.com/wp-content/uploads/2015/03/john-cena-john-cena.jpg",
                        "http://www2.pictures.gi.zimbio.com/John+Cena+Lions+Gate+Premiere+See+No+Evil+nPMaSdcrckVl.jpg",
                        "http://chaddukeswrestlingshow.com/wp-content/uploads/2011/12/JON-CENA-john-cena-17402034-500-308.jpg",
                        "http://i.imgur.com/rGaAhA1.jpg",
                        "http://i.imgur.com/UiHqlME.jpg",
                        "https://370c91614d34bfed666d6ea8a80d96f0b81747b5.googledrive.com/host/0B6Pvjxj4eVP5WndLVkdOWG9DNHc/JohnCenaRarePhotos",
                        "http://healthyceleb.com/wp-content/uploads/2013/08/WWE-John-Cena-Bodybuilding.jpg",
                        "http://cdn.papermag.com/uploaded_images/shia.jpg", //shia
                        "http://images.enstarz.com/data/images/full/3786/john-cena.jpg?w=580"];
 
        for(var i = 0; i < images.length; i++){
            try {
                var element = images[i];
                element = element.setAttribute("src",imageList[Math.floor((Math.random() * 10))]);
            }
            catch (err) {
                console.log("Invalid image.");
            }
        }
 
        // Walk through all the nodes to get all text nodes.
        // Thanks to: http://stackoverflow.com/a/5904945
        // and also: http://stackoverflow.com/a/9452386
        var textNodes = [];
        (function walkNodeForText(node) {
            if (node) {
                node = node.firstChild;
                while (node != null) {
                    switch (node.nodeType) {
                        // Recurse into elements, documents, and document fragments
                        case 1:
                        case 9:
                        case 11:
                            walkNodeForText(node);
                            break;
                        // Add text nodes to the list of elements we want to modify
                        case 3:
                            textNodes.push(node);
                            break;
                    }
 
                    node = node.nextSibling;
                }
            }
        })(document.body);
 
        var quoteList = [" IF YOU WANT SOME COME GET SOME ",
            " THE ONLY REAL JOHN IS JOHN CENA ",
            " YOU CAN'T SEE ME ",
            " THE CHAMP IS HERE ",
            " ATTITUDE ADJUSTMENT ", 
            " HUSTLE, LOYALTY, RESPECT ",
            " NEVER GIVE UP ", 
            " U CAN'T SEE ME", 
            " VINCE MCMAHON OWNS ME ", 
            " WORD LIFE ", 
            " BASIC THUGONOMICS ", 
            " WHETHER FIGHTING OR SPITTING, MY DISCIPLINE IS UNFORGIVING! "]; 
 
        textNodes.forEach(function(currentVal, index, array) {
            // replace all case-insensitive occurences of 'cloud' with 'butt'.

           currentVal.nodeValue = currentVal.nodeValue.replace(/ the /gi, quoteList[Math.floor((Math.random() * 10))] );
        });


 
        }
    }, 10);
});





          