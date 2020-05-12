var collegeCollection = [];

function init() {
    // fetch('/universities/all').then(async function (response) {
    //     // The API call was successful!
    //     collegeCollection = await response.json();
    //     refresh();
    // }).catch(function (err) {
    //     // There was an error
    //     console.warn('Something went wrong.', err);
    // });
}



function onClicked(id) {
    let cardNode = document.getElementById(id);
    if (cardNode.classList.contains("event-item-expanded"))
        cardNode.classList.remove("event-item-expanded")
    else cardNode.classList.add("event-item-expanded")

}

// document.addEventListener('DOMContentLoaded', () => {
//     // init();
// });