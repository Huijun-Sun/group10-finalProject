var collegeCollection = [];

var initIntro = function () {
    fetch('/universities/top').then(async function (response) {
        // The API call was successful!
        collegeCollection = await response.json();
        refreshIntro();
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

var refreshIntro = function () {
    let listNode = document.getElementById('college-list');
    listNode.innerHTML = "";
    for (const college of collegeCollection) {
        console.log(college);
        listNode.innerHTML += `<button class="college-item card column">
        <div class="college-item-header">
            <h2 class="college-item-title">${college.title}</h2>
            <div class="college-item-rating material-align-center">
                <p class="college-item-score">${college.rating}</p>
                <a class="material-icon">star</a>
            </div>
        </div>
        <div class="row">
            <div class="college-item-detail column">
                <p class="material-align-center">
                    <a class="material-icon">assessment</a>
                    Ranking: ${college.rank}
                </p>
                <p class="material-align-center">
                    <a class="material-icon">account_balance </a>
                    <a>Type: ${college.category} University</a>
                </p>
                <p class="material-align-center">
                    <a class="material-icon">monetization_on</a>
                    Tuition: ${college.tuitionfees}
                </p>

                <p class="material-align-center">
                    <a class="material-icon">location_on</a>
                    Location: ${college.location}
                </p>
            </div>
            <div class="college-item-spacer"></div>
        </div>
    </button>`;
    }
}
