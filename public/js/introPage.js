var collegeCollection = [];

function initIntro() {
    fetch('/universities/top').then(async function (response) {
        // The API call was successful!
        collegeCollection = await response.json();
        refreshIntro();
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

function refreshIntro() {
    let listNode = document.getElementById('college-list');
    listNode.innerHTML = "";
    for (const college of collegeCollection) {
      //   console.log(college);
        listNode.innerHTML += `
        <button class="college-item card column" id="${college._id}" onclick="onCollegeClicked(this.id)" style="width: 300px;">
        <div class="college-item-header" style="width: 300px;">
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
        </div>
    </button>`;
    }
}

function onCollegeClicked(id) {
    window.location.href = `/universities/id/${id}`;

}

document.addEventListener('DOMContentLoaded', () => {
    initIntro();
});
