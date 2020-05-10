let eventCollection = [{
    "_id": "4821c5f4-c203-4758-89d6-905725676d08",
    "eventName": "150th Founder's Day: Graduate Celebration",
    "university_Name": "Stevens Institute of Technology",

    "introduction": "Join us as we celebrate 150 years of passion, purpose and growth! Through 2021, Stevens will be hosting a number of special events to commemorate this momentous milestone in our history.",
    "startDate": "2020-02-21",
    "endDate": "2020-02-25",
    "eventType": "information",
    "URL": "https://stevens150.com/"
}];

document.addEventListener('DOMContentLoaded', (event) => {
    let listNode = document.getElementById('event-list');
    for (const event of eventCollection) {
        console.log(event.university_Name);
        listNode.innerHTML += `<button id="${event._id}" class="event-item card column" onClick="onClicked(this.id)">
                <div class="event-item-title">${event.eventName}</div>
                <div class="event-item-detail">
                    <p class="event-item-hidden event-item-intro">
                        ${event.introduction}
                    </p>
                    <p class="material-align-center">
                        <a class="material-icon">location_on</a>
                        ${event.university_Name}
                    </p>
                    <p class="material-align-center">
                        <a class="material-icon">query_builder</a>
                        ${event.startDate} - ${event.endDate}
                    </p>
                    <p class="material-align-center event-item-hidden" >
                        <a class="material-icon">link </a>
                        <a href="${event.URL}">&nbsp${event.URL}</a>
                    </p>
                </div>
            </button>`;
    }
})

function onClicked(id) {
    let cardNode = document.getElementById(id);
    if (cardNode.classList.contains("event-item-expanded"))
        cardNode.classList.remove("event-item-expanded")
    else cardNode.classList.add("event-item-expanded")

}

