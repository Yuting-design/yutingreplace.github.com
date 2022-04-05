let globalData;
const background = document.querySelector('body');
async function getData(){
    const myHeartRate = await fetch('data.json');
    const data = await myHeartRate.json();
    //console.log(data);
    globalData = data;
    document.querySelector('#timeSelecter').innerHTML = createTimeSelecter(data);
}
function createTimeSelecter(data){
    let html = '<option>Time</option>';
    const myTimes = Object.keys(data);
    console.log(myTimes);
    myTimes.forEach( function(each){
        html += `<option value="${each}">${each}</option>`;
    } );
    return html;
}
getData();

document.querySelector('#timeSelecter').addEventListener('change', function(){
    const newValue = this.value;
    updateValue(newValue, globalData);
    updateBackground(); 
    updateHeart(newValue, globalData)
});

function updateValue(value, jsonData){
    let html = `
    <p>At time:</p>
    <div><p class = 'hltext'>${value}</p></div> 
    <p>my heart rate was</p>
    <div id = 'heartRate'><p class = 'hltext'>${jsonData[value]}</p><p> PR bpm</p></div>`;
    document.querySelector('#result').innerHTML = html;
}

function updateHeart(value, jsonData){
    const myHeart = document.querySelector('.fa-heartbeat');
    if(65 < jsonData[value] && jsonData[value] < 75){
        myHeart.id = "slow";
    }else if(75 <= jsonData[value] && jsonData[value] < 85){
        myHeart.id = "gentle";
    }else{
        myHeart.id = "fast";
    }
}

function updateBackground(){
    background.style.backgroundColor = `rgb(${getRandomIntInclusive(155, 255)}, ${getRandomIntInclusive(155, 255)}, ${getRandomIntInclusive(155, 255)})`
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
