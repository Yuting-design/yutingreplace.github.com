(function(){
    'use strict';
    console.log("reading js");

    //articles------------------------------------------------------
    const francis = "<h2>Francis</h2><p>My first child, made by M.K. Born in the spring of 2014.</p>";
    const fran = "<h2>Fran</h2><p>Francis' twin brother. Fran was born when Francis was four years old. He was also made by M.K.</p>";
    const hyacinth = "<h2>Hyacinth</h2><p>Hyacinth is a child I made myself. He's not the first kid I've made, but he's one of the most successful.</p>";
    const miller = "<h2>Miller</h2><p>Miller was the last doll I ever made. He was born in the winter of 2018. This was the first action doll I have sold. Although its popularity, I only made 20 due to my limited energy.</p>";
    const whity = "<h2>Whity</h2><p>I bought Whity from a flea market. He is the oldest. He was born in 2008. After some repairs and alterations, he became what he is now.</p>";
    const devil = "<h2>Devil</h2><p>Devil was a very beautiful child. Of course, it's expensive, too. Devil is the only adult size in the family. He was sold to a northern girl in 2019.</p>";
    //articles end-------------------------------------------------------

    const navigater = document.querySelectorAll('.navigater');
    const imageContainer = document.querySelector('#image');
    const hotSpots = document.querySelectorAll('#image div');
    const theImg = document.querySelector('#image img');


    //change image by move mouse on names-------------------------
    navigater.forEach(function(eachNav){
        eachNav.addEventListener('mouseenter',showImage);
    });
    function showImage(event){
        event.preventDefault();
        const targetID = event.target.getAttribute('id');
        const currentImage = document.querySelector('img');
        currentImage.src = `images/${targetID}.jpeg`; 
        showArticle(targetID);
    }//change image end------------------------------------------------

    //zoom image-------------------------------
    hotSpots.forEach(function (eachSpot) {
        eachSpot.addEventListener('mouseover', zoomPhoto);
        eachSpot.addEventListener('mouseout', function () {
            theImg.className = 'start';
        });
    
    });
    function zoomPhoto(event) {
        const thisCorner = event.target.id;
        switch (thisCorner) {
            case 'topleft': theImg.className = 'topleft'; break;
            case 'topright': theImg.className = 'topright'; break;
            case 'bottomleft': theImg.className = 'bottomleft'; break;
            case 'bottomright': theImg.className = 'bottomright'; break;
            case 'center': theImg.className = 'center'; break;
        }
    }//zoom image end--------------------------------

    //check which article need to be show--------------------
    function showArticle(newClass){
        //console.log(newClass);
        if(newClass == 'Francis'){
            document.querySelector('article').innerHTML = francis;
        }else if(newClass == 'Fran'){
            document.querySelector('article').innerHTML = fran;
        }else if(newClass == 'Hyacinth'){
            document.querySelector('article').innerHTML = hyacinth;
        }
        else if(newClass == 'Miller'){
            document.querySelector('article').innerHTML = miller;
        }
        else if(newClass == 'Whity'){
            document.querySelector('article').innerHTML = whity;
        }
        else if(newClass == 'Devil'){
            document.querySelector('article').innerHTML = devil;
        }
        

    }

    
}());