var collegeNames = [];

function initNav() {
    fetch('/universities/names').then(async function (response) {
        // The API call was successful!
        collegeNames = await response.json();
        refreshNav();
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

function refreshNav() {
<<<<<<< HEAD
    let selectNodes = document.getElementsByClassName('college-name-select');
    for (const node of selectNodes) {
        node.innerHTML = "";
        for (const name of collegeNames) {
            node.innerHTML += `<option value="${name}">${name}</option>`;
        }
=======
    let selectNode = document.getElementById('search-college-name');
    selectNode.innerHTML = "";
    for (const name of collegeNames) {
      //  console.log(name);
        selectNode.innerHTML += `<option value="${name}">${name}</option>`;
>>>>>>> monisha_branch
    }
}

function onClicked(id) {
    let cardNode = document.getElementById(id);
    if (cardNode.classList.contains("event-item-expanded"))
        cardNode.classList.remove("event-item-expanded")
    else cardNode.classList.add("event-item-expanded")

}

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    
    if(initIntro != undefined) {
        initIntro();
    }
});