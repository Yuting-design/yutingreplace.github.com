(function () {
    //link to back4App
    Parse.initialize("wsRzOaXKQ0bnyMn22gA72ytEsQIhGkGbNPwtZE6K", "tTUipNNG8w1yA2APSZLbE1Volgn8Z27DZ2LA5egC"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/';
    //get date
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date();
    let todayIs = `<div class="todayIs">${d.getDate()}</div><div class="name">${monthList[d.getMonth()]}</div>`;
    //get date of today in global sp day
    async function checkWorld(date) {
            const worldSpDay = await fetch('data/usSpDays.json');
            const allDate = await worldSpDay.json();
            let worldToday = '';
            for (let i = 0; i < allDate.length; i++) {
                if (allDate[i].date == date) {
                    worldToday+=`<p>${allDate[i].name}</p>`;
                }
            }
            console.log(worldToday);
            if(worldToday == ''){
                document.getElementById('worldToday').innerHTML = '<p>What is special about today for you? Please share it with us!</p>';
            }else{
                document.getElementById('worldToday').innerHTML = worldToday;
            }    
        }
        checkWorld(d.getDate());
    
    document.querySelector('#date').innerHTML = todayIs;
    document.querySelector('#dateDetialDisplayer').innerHTML =
                `<section class = 'side left'>
                    <div>${d.getDate()}</div>
                    <h2 class = 'side left'>${monthList[d.getMonth()]}</h2>    
                </section>
                
                <section class = 'side right'>
                    <h2>Today is:</h2>
                    <div id = 'worldToday'></div>
                </section>       
                <button class="closeBtn" id = 'dateCloseBtn' type='button'>Close</button>`;
    
    

    //get mood
    const mood = ['good', 'bad', 'dontKnow']
    const color = ['230, 39, 147', '58, 58, 255', '144, 59, 255']
    //add new 
    //form pages
    const addbutton = document.querySelector('#add-button');
    const formPage1 = document.querySelector('#page1');
    const formPage2 = document.querySelector('#page2');
    const formPage3 = document.querySelector('#page3');
    const cancelBtn = document.querySelector('#cancelBtn');
    const nextTo2 = document.querySelector('#nextTo2');
    const backTo1 = document.querySelector('#backTo1');
    const nextTo3 = document.querySelector('#nextTo3');
    const backTo2 = document.querySelector('#backTo2');
    const submit = document.querySelector('#submit');
    const spdayDisplayer = document.querySelector('#spdayDisplayer');
    const popWindow = document.querySelector('#popWindow');
    let thisRecord;

    addbutton.addEventListener('click', function () {
        formPage1.className = 'add-form';
        popWindow.className = 'show';
    })
    cancelBtn.addEventListener('click', function () {
        formPage1.className = 'add-form hide';
        popWindow.className = 'hide';
        resetForm();
    })
    nextTo2.addEventListener('click', function () {
        formPage1.className = 'add-form hide';
        formPage2.className = 'add-form';
        formPage3.className = 'add-form hide';
    })
    backTo1.addEventListener('click', function () {
        formPage1.className = 'add-form';
        formPage2.className = 'add-form hide';
        formPage3.className = 'add-form hide';
    })
    nextTo3.addEventListener('click', function () {
        formPage1.className = 'add-form hide';
        formPage2.className = 'add-form hide';
        formPage3.className = 'add-form';
    })
    backTo2.addEventListener('click', function () {
        formPage1.className = 'add-form hide';
        formPage2.className = 'add-form';
        formPage3.className = 'add-form hide';
    })
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        formPage3.className = 'add-form hide'; //test
        popWindow.className = 'hide'
        console.log('submit');
        addNewDay();
    });

    //delete / show chicker-------------------------
    document.addEventListener('click', function (event) {
        //if delete
        if (event.target.matches('.deleteBtn')) {
            thisRecord = event.target.parentNode.getAttribute('id').slice(2);
            deleteDay(thisRecord);
        }
        if (event.target.matches('.closeBtn')) {
            if (event.target.getAttribute('id') == 'dateCloseBtn') {
                document.getElementById('dateDetialDisplayer').className = 'hide';
                document.getElementById('popWindow').className = 'hide';
            } else {
                document.getElementById('popWindow').className = 'hide';
                closeDaydetial();
            }

        }
        if (event.target.matches('.cube') || event.target.matches('.name') || event.target.matches('.todayIs') || event.target.matches('.cubeBack')) {
            //show date detial
            if (event.target.getAttribute('id') == 'date' || event.target.parentNode.getAttribute('id') == 'date') {
                document.getElementById('popWindow').className = 'show';
                document.getElementById('dateDetialDisplayer').className = 'show';
            }
            //show add detial
            else if (event.target.parentNode.getAttribute('id') == 'add-button' || event.target.getAttribute('id') == 'add-button') {
                console.log('add click')
                formPage1.className = 'add-form';
                popWindow.className = 'show';
            }
            //show sp day detial
            else {
                thisRecord = event.target.getAttribute('id').slice(2);
                console.log('showing detial' + thisRecord);
                document.getElementById('popWindow').className = 'show';
                showDaydetial(thisRecord);
            }
        }
    }, false);

    //upload to back4app ------------------------

    async function addNewDay() {
        const inputs = document.querySelectorAll("input:not([type=submit])");
        const newDay = {};
        for (let i = 0; i < inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newDay[key] = value;
        }
        const feelings = document.querySelectorAll(".feeling");
        for (let i = 0; i < feelings.length; i++) {
            if (feelings[i].checked == true) {
                newDay['feeling'] = feelings[i].value;
            }
        }
        newDay['detials'] = document.querySelector('#detials').value;

        // console.log(newDay); //test

        // resetForm(); //test

        //upload to back4app
        const newDayData = new Parse.Object('SpecialDays');
        if (newDay.uname != "" && newDay.spday != "" && newDay.feeling != "" && newDay.level != "") {
            newDayData.set('uname', newDay.uname);
            newDayData.set('spday', newDay.spday);
            newDayData.set('feeling', newDay.feeling);
            newDayData.set('level', newDay.level);
            newDayData.set('detials', newDay.detials);
        } else {
            //show a pop asking for more info;
        }
        try {
            const result = await newDayData.save();
            resetForm();
            formPage3.className = 'add-form hide';
            document.getElementById('spdayDisplayer').innerHTML = '';
            displaySpDays();
        } catch (error) {
            console.error('Error while creating days:', error);
        }
    }

    //reset form after submit --------------------------
    function resetForm() {
        document.getElementById('uname').value = "";
        document.getElementById('spday').value = "";
        document.getElementById('level').value = "5";
        document.getElementById('detials').value = "";
        const feelings = document.querySelectorAll(".feeling");
        for (let i = 0; i < feelings.length; i++) {
            if (i == 2) {
                feelings[i].checked = true;
            } else {
                feelings[i].checked = false;
            }
        }
    }

    //delete
    async function deleteDay(recordId) {
        const youAreSure = confirm('Are you sure you want to delete this day?');
        if (youAreSure) {
            const query = new Parse.Query('SpecialDays');
            try {
                const object = await query.get(recordId);
                try {
                    await object.destroy();
                    document.getElementById(`r-${recordId}`).className = 'remove';
                    setTimeout(function () {
                        const elem = document.getElementById(`r-${recordId}`);
                        elem.parentNode.removeChild(elem);
                    }, 1500);
                } catch (error) {
                    console.error('Error while deletingg ParseObject', error);
                }
            } catch (error) {
                console.error('Error while retrieving ParseObject', error);
            }
        }
    }

    //show detial ----------------------
    async function showDaydetial(recordId) {
        const query = new Parse.Query('SpecialDays');
        try {
            const object = await query.get(recordId);
            console.log(object);
            const uname = object.get('uname');
            const spday = object.get('spday');
            const level = object.get('level');
            const feeling = object.get('feeling');
            const detials = object.get('detials');

            const theDetial = document.createElement("div");
            theDetial.setAttribute("class", "theDetial");
            theDetial.innerHTML =
                `
                <section class = 'side left'>
                    <h2 class = 'side left'>${uname}</h2>
                    <div>${spday}</div>
                </section>
                
                <section class = 'side right'>
                    <div>${detials}</div>
                </section>       
                <button class="closeBtn" type='button'>Close</button>`
            //<button class="deleteBtn" type='button'>Delete</button> 

            ;
            popWindow.append(theDetial);
            for (let i = 0; i < mood.length; i++) {
                if (mood[i] == feeling) {
                    document.querySelector('.theDetial').style.backgroundColor = `rgb(${color[i]})`;
                }
            }
        } catch (error) {
            console.error('Error while showing detial', error);
        }
    }
    //close detial -----------------------------
    function closeDaydetial() {
        const elem = document.querySelector(".theDetial");
        elem.parentNode.removeChild(elem);
    }

    //read from back4app ----------------------
    async function displaySpDays() {
        const spDays = Parse.Object.extend('SpecialDays');
        const query = new Parse.Query(spDays);
        try {
            const results = await query.ascending('updateAt').find();
            // console.log(results);
            results.forEach(function (eachSpDay) {
                const id = eachSpDay.id;
                const uname = eachSpDay.get('uname');
                const spday = eachSpDay.get('spday');
                const level = eachSpDay.get('level');
                const feeling = eachSpDay.get('feeling');
                // const detials = eachSpDay.get('detials');

                const theListItem = document.createElement("div");
                theListItem.setAttribute("id", `r-${id}`);
                theListItem.setAttribute("class", "cube");
                theListItem.innerHTML = `<div class = 'cubeBack' id = 'b-${id}'>
                <div class="name" id="n-${id}">${uname}:</div>
                <div class="todayIs" id="d-${id}">"${spday}"</div>
                </div>
                `;
                spdayDisplayer.append(theListItem);
                //color set
                document.getElementById(`b-${id}`).style.backgroundColor = `rgb(255,255,255,${1-(level*0.07+0.3)})`;
                for (let i = 0; i < mood.length; i++) {
                    if (mood[i] == feeling) {
                        document.getElementById(`r-${id}`).style.backgroundColor = `rgb(${color[i]})`;
                    }
                }
            });
        } catch {
            console.error('Error while fetching Friends', error);
        }
    }

    displaySpDays();


    // $('#spdayDisplayer').masonry({
    //     itemSelector: '.grid-item',
    //     columnWidth: 160
    // });


})();