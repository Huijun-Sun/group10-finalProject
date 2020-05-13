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



function onCollegeClicked(id) {
    let cardNode = document.getElementById(id);
    if (cardNode.classList.contains("college-item-expanded"))
        cardNode.classList.remove("college-item-expanded")
    else cardNode.classList.add("college-item-expanded")

}

// document.addEventListener('DOMContentLoaded', () => {
//     // init();
// });



let newuv = {
    // title: title,
    courses: courses,
    // category: category,
    programs: programs,
    // location: location,
    deadline: deadline,
    // tuitionfees: tuitionfees,
    // rating: rating,
    // rank: rank,
    livingexp: livingexp,
    // averagescore: averagescore,
    // websitelink: websitelink,
    // workexp: workexp,
    // GPA: GPA,
    intake: intake,
    papers: papers,
    description: description,
    coursedesc: coursedesc
    
}