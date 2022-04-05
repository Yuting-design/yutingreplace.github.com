// JS here
// (function () {
//     "use strict"

// })();

Parse.initialize("jWPPt0Kg8W6MkcwOuMc2wCGAwcmunXDc5rEkvNB0", "MLl3OkUOQ2xCkfyP7lL8IbAczPja385FFP9vikLd"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'

const inputs = document.querySelectorAll("#add-friend input:not([type=submit])");
const newBtn = document.getElementById('newbtn');
const editBtns = document.querySelectorAll('.fa-edit');
const addFriendForm = document.getElementById('add-friend');
const editFriendForm = document.getElementById('edit-friend');
const friendList = document.querySelector("main ol");
let thisRecord;


//------------------------Add----------------------
newBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addFriendForm.className = 'add-friend-onscreen';
})
addFriendForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // addFriendForm.className = 'add-friend-offscreen';
    addFriend();
});
async function addFriend() {
    const newFriend = {};
    for (let i = 0; i < inputs.length; i++) {
        let key = inputs[i].getAttribute('name');
        let value = inputs[i].value;
        newFriend[key] = value
    }
    console.log(newFriend);
    const newFriendData = new Parse.Object('Friends');
    if (newFriend.fname != "" && newFriend.lname != "" && newFriend.email != "") {
        newFriendData.set('fname', newFriend.fname);
        newFriendData.set('lname', newFriend.lname);
        newFriendData.set('email', newFriend.email);
        newFriendData.set('facebook', newFriend.facebook);
        newFriendData.set('twitter', newFriend.twitter);
        newFriendData.set('instagram', newFriend.instagram);
        newFriendData.set('linkedin', newFriend.linkedin);
    } else {
        addFriendForm.className = "add-friend-offscreen";
    }
    try {
        const result = await newFriendData.save();
        resetFormFields();
        addFriendForm.className = "add-friend-offscreen";
        friendList.innerHTML = '';
        displayFriends();
    } catch (error) {
        console.error('Error while creating friend:', error);
    }
}

function resetFormFields() {
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('fbook').value = "https://facebook.com";
    document.getElementById('twitter').value = "https://twitter.com";
    document.getElementById('insta').value = "https://instagram.com";
    document.getElementById('linkedin').value = "https://linkedin.com";
}


//---------------------------edit---------------------------
// for (let i = 0; i < editBtns.length; i++) {
//     editBtns[i].addEventListener('click', function (event) {
//         event.preventDefault();
//         editFriendForm.className = 'edit-friend-onscreen';
//     })
// }
document.addEventListener('click', function (event) {
    //if edit
    if (event.target.matches('.fa-edit')) {
        // editFriendForm.className = 'edit-friend-onscreen';
        thisRecord = event.target.getAttribute('id').slice(2);
        // console.log(thisRecord);
        setForm(thisRecord);
    }
    //if delete
    if(event.target.matches('.fa-times-circle')){
        thisRecord = event.target.getAttribute('id').slice(2);
        deleteRecord(thisRecord);
    }
}, false);
//delete function
async function deleteRecord(recordId){
    const youAreSure = confirm('Are you sure you want to delete this record?');
    if(youAreSure){
        const query = new Parse.Query('Friends');
        try{
            const object = await query.get(recordId);
            try{
                await object.destroy();
                document.getElementById(`r-${recordId}`).className = 'remove';
                setTimeout(function(){
                    const elem = document.getElementById(`r-${recordId}`);
                    elem.parentNode.removeChild(elem);
                },1500);
            }catch(error){
                console.error('Error while deletingg ParseObject',error);
            }
        }catch(error){
            console.error('Error while retrieving ParseObject',error);
        }
    }
}
// edit function
async function setForm(recordId) {
    const friends = Parse.Object.extend('Friends');
    const query = new Parse.Query(friends);
    query.equalTo('objectId', recordId);
    try {
        const results = await query.find()
        results.forEach(function (thisFriend) {
            const fname = thisFriend.get('fname');
            const email = thisFriend.get('email');
            const facebook = thisFriend.get('facebook');
            const twitter = thisFriend.get('twitter');
            const instagram = thisFriend.get('instagram');
            const linkedin = thisFriend.get('linkedin');
            const lname = thisFriend.get('lname');
            document.getElementById('fname-edit').value = fname;
            document.getElementById('lname-edit').value = lname;
            document.getElementById('email-edit').value = email;
            document.getElementById('fbook-edit').value = facebook;
            document.getElementById('twitter-edit').value = twitter;
            document.getElementById('insta-edit').value = instagram;
            document.getElementById('linkedin-edit').value = linkedin;
        })
        editFriendForm.className = 'edit-friend-onscreen';
    } catch (error) {
        console.error('Error while fetching Friends', error);
    }
}
editFriendForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // editFriendForm.className = 'edit-friend-offscreen';
    updateRecord(thisRecord);
});
async function updateRecord(recordId) {
    const theFields = document.querySelectorAll("#edit-friend input:not([type=submit])");
    const editedRecord = {};
    let key;
    let value;
    for (let i = 0; i < theFields.length; i++) {
        key = theFields[i].getAttribute("name");
        value = theFields[i].value;
        editedRecord[key] = value;
    }
    const friends = Parse.Object.extend('Friends');
    const query = new Parse.Query(friends);
    try {
        const object = await query.get(recordId);
        object.set('fname', editedRecord.fname);
        object.set('lname', editedRecord.lname);
        object.set('email', editedRecord.email);
        object.set('facebook', editedRecord.facebook);
        object.set('twitter', editedRecord.twitter);
        object.set('instagram', editedRecord.instagram);
        object.set('linkedin', editedRecord.linkedin);
        try {
            await object.save();
            editFriendForm.className = 'edit-friend-offscreen';
            friendList.innerHTML = '';
            displayFriends();
        } catch (error) {
            console.error('Error while updating friends', error);
        }
    } catch (error) {
        console.error('Error while retrieving object friends', error);
    }
}


//--------------------------read-----------------------------
async function displayFriends() {
    const friends = Parse.Object.extend('Friends');
    const query = new Parse.Query(friends);
    try {
        const results = await query.ascending('lname').find();
        // console.log(results);
        results.forEach(function (eachFriend) {
            const id = eachFriend.id;
            const fname = eachFriend.get('fname')
            const email = eachFriend.get('email')
            const facebook = eachFriend.get('facebook')
            const twitter = eachFriend.get('twitter')
            const instagram = eachFriend.get('instagram')
            const linkedin = eachFriend.get('linkedin')
            const lname = eachFriend.get('lname')

            const theListItem = document.createElement("li");
            theListItem.setAttribute("id", `r-${id}`);
            theListItem.innerHTML = `
                <div class="name">
                    ${fname} ${lname}
                </div>
                <div class="email">
                    <i class="fas fa-envelope-square"></i> ${email}
                </div>
                <div class="social">
                    <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                    <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                    <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                    <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                </div>
                <i class="fas fa-edit" id = "e-${id}"></i>
                <i class="fas fa-times-circle" id = "d-${id}></i>`;

            friendList.append(theListItem);
        });
    } catch {
        console.error('Error while fetching Friends', error);
    }
}

displayFriends();