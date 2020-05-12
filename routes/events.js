const express = require('express');
const router = express.Router();
const data = require('../data');
const eventData = data.events;

const scripts = [{ script: "/public/js/eventsPage.js" }]

router.get('/', async (req, res) => {
  try {
    let eventList = await eventData.getAllEvents();
    res.render("eventsPage", {
      heading: "Events",
      sub_heading: "Get involved, and learn more about your dream college!",
      scripts: scripts,
      showSearch: true,
      loggedOut: !req.session.isloggedin,
      eventList: eventList,
    });
  } catch (e) {
    res.render("eventsPage", {
      heading: "Events",
      sub_heading: "Get involved, and learn more about your dream college!",
      scripts: scripts,
      showSearch: true,
      loggedOut: !req.session.isloggedin,
      eventList: [],
      error: e
    });
  }
});

router.get('/pastEvents', async (req, res) => {
  try {
    let eventList = await eventData.getPastEvents();
    res.render('events', { eventList: eventList });
  } catch (e) {
    res.status(404).json({ error: 'past events not found' });
  }
});

router.get('/all', async (req, res) => {
  try {
    let eventList = await eventData.getAllEvents();
    res.render('events', { eventList: eventList });
  } catch (e) {
    res.status(404).json({ error: 'events not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    let eventList = await eventData.getUpcomingEvents();
    res.render('events', { eventList: eventList });
  } catch (e) {
    res.status(404).json({ error: 'upcoming events not found' });
  }
});




module.exports = router;
