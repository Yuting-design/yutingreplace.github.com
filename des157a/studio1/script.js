(function () {
    'use strict';
    const myForm = document.querySelector('#myForm');
    const madlib = document.querySelector('#madlib');
    const tryAgain = document.querySelector('#tryAgain');
    let myText;

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        //get all words------------------------------------------------
        const noun1 = document.querySelector('#noun1').value;
        const noun2 = document.querySelector('#noun2').value;
        const adj = document.querySelector('#adj').value;
        const verb = document.querySelector('#verb').value;
        const adv = document.querySelector('#adv').value;



        //check if user enter all words---------------------------------------
        if (noun1 && noun2 && adj && verb && adv) {
            myText = `Hello, welcome to the Mad Forest. You will have a meaningless trip here. Your guide ${noun1} will meet you at ${noun2} soon. The weather in Mad Forest is likely to be ${adj}, so please dress appropriately and be ready to go. You will experience ${adv} eating, and a pleasant ${verb} in the Mad Forest. All of these are free. Hope you have a fun and crazy day!`;
        } else if (noun1 && noun2 && adj && verb) {
            myText = 'Please give me an adverb so I can make your Mad Lib!';
        } else if (noun1 && noun2 && adj && adv) {
            myText = 'Please give me a verb so I can make your Mad Lib!';
        } else if (noun1 && noun2 && verb && adv) {
            myText = 'Please give me an weather so I can make your Mad Lib!';
        } else if (noun1 && adj && verb && adv) {
            myText = 'Please give me a place so I can make your Mad Lib!';
        } else if (noun2 && adj && verb && adv) {
            myText = 'Please give me a name so I can make your Mad Lib!';
        } else {
            myText = 'Please give me words so I can make your Mad Lib!';
        }

        //show the text-------------------------------------------------------------------------------------------
        madlib.querySelector("p").innerHTML = `${myText}`;
        document.getElementById("madlib").style.visibility = "visible";
        document.getElementById("mydiv").style.visibility = "hidden";

        //reset all the form input----------------------------------------------
        const formData = document.querySelectorAll('input[type=text]');
        for (let eachField of formData) {
            eachField.value = '';
        }
    });
    tryAgain.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById("madlib").style.visibility = "hidden";
        document.getElementById("mydiv").style.visibility = "visible";
    })

}());