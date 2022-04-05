(function () {
    //link to back4App
    Parse.initialize("wsRzOaXKQ0bnyMn22gA72ytEsQIhGkGbNPwtZE6K","tTUipNNG8w1yA2APSZLbE1Volgn8Z27DZ2LA5egC"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/';
    // get date
    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const d = new Date();
    let todayIs = `<p>${monthList[d.getMonth()]}</p><h2>${d.getDate()}</h2>`;
    document.querySelector('#date').innerHTML = todayIs;

    // add new 
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
    addbutton.addEventListener('click',function(){
        formPage1.className = 'add-form';
    })
    cancelBtn.addEventListener('click',function(){
        formPage1.className = 'add-form hide';
    })
    nextTo2.addEventListener('click',function(){
        formPage1.className = 'add-form hide';
        formPage2.className = 'add-form';
        formPage3.className = 'add-form hide';
    })
    backTo1.addEventListener('click',function(){
        formPage1.className = 'add-form';
        formPage2.className = 'add-form hide';
        formPage3.className = 'add-form hide';
    })
    nextTo3.addEventListener('click',function(){
        formPage1.className = 'add-form hide';
        formPage2.className = 'add-form hide';
        formPage3.className = 'add-form';
    })
    backTo2.addEventListener('click',function(){
        formPage1.className = 'add-form hide';
        formPage2.className = 'add-form';
        formPage3.className = 'add-form hide';
    })
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        formPage3.className = 'add-form hide';
        console.log('submit');
        addNewDay();
    });

    //
    const inputs = document.querySelectorAll("input:not([type=submit])");
    async function addNewDay() {
        const newDay = {};
        for (let i = 0; i < inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newDay[key] = value
        }
        const feelings = document.querySelectorAll(".feeling");
        for (let i = 0; i < feelings.length; i++) {
            if(feelings[i].checked == true){
                newDay['feeling'] = feelings[i].value;
            }
        }
        newDay['detials'] = document.querySelector('#detials').value;
        
        console.log(newDay);
        // const newDayData = new Parse.Object('SpecialDays');
        // if (newDay.uname != "" && newDay.spday != "" && newDay.feeling != "" && newDay.level != "") {
        //     newDayData.set('uname', newDay.uname);
        //     newDayData.set('spday', newDay.spday);
        //     newDayData.set('feeling', newDay.feeling);
        //     newDayData.set('level', newDay.level);
        //     newDayData.set('detials', newDay.detials);
        // } else {
        //     formPage3.className = 'add-form hide';
        // }
        // try {
        //     const result = await newDayData.save();
        //     resetForm();
        //     formPage3.className = 'add-form hide';
        //     main.innerHTML = '';
        //     displaySpDays();
        // } catch (error) {
        //     console.error('Error while creating days:', error);
        // }
    }
    

})();