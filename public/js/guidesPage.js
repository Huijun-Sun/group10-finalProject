

let eduArticles = [
    { name: "businessAdministration", title: "What is Business Administration" },
    { name: "stemEducation", title: "What is STEM Education" },
]

let testArticles = [
    { name: "gmat", title: "What is GMAT" },
    { name: "gre", title: "What is GRE" },
    { name: "ielts", title: "What is IELTS" },
    { name: "toefl", title: "What is TOEFL" },
]

function refreshGuides() {
    let eduList = document.getElementById("guides-edu-list");
    eduList.innerHTML = "";
    for (const article of eduArticles) {
        eduList.innerHTML += `<button class="guides-card card guides-card-purple" id="${article.name}" onclick="openArticle(this.id)">${article.title}</button>`;
    }

    let testList = document.getElementById("guides-test-list");
    testList.innerHTML = "";
    for (const article of testArticles) {
        testList.innerHTML += `<button class="guides-card card guides-card-red" id="${article.name}" onclick="openArticle(this.id)">${article.title}</button>`;
    }

}

function openOverlay() {
    document.getElementById("guide-article-overlay").style.visibility = "visible";
}

function closeOverlay() {
    document.getElementById("guide-article-overlay").style.visibility = "hidden";
}

function openArticle(id) {
    //console.log("open" + id);
    openOverlay();


    fetch(`/public/md/${id}.md`)
        .then(function (response) {
            response.text().then(function (text) {
                document.getElementById('guide-article-content').innerHTML =
                    marked(text);
            });
        });

}

document.addEventListener('DOMContentLoaded', () => {
    refreshGuides();
});
