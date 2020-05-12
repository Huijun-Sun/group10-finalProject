const express = require('express');
const router = express.Router();
const data = require('../data');
const eventData=data.events;

router.get('/pastEvents', async (req, res) => {
    try {
      let eventList = await eventData.getPastEvents();
      res.render('events',{eventList:eventList});
    } catch (e) {
      res.status(404).json({error: 'past events not found'});
    }
  });

  /*router.get('/upcomingEvents', async (req, res) => {
    try {
      let band = await bandData.getBandById(req.params.id);
      res.status(200).json(band);
    } catch (e) {
      res.status(404).json({error: 'band not found'});
    }
  });*/

  router.get('/allEvents', async (req, res) => {
    try {
      let eventList=await eventData.getAllEvents();
      res.render('events',{eventList:eventList});
    } catch (e) {
      res.status(404).json({error: 'events not found'});
    }
  });

  router.get('/', async (req, res) => {
    try {
        let eventList=await eventData.getUpcomingEvents();
        res.render('events',{eventList:eventList});
    } catch (e) {
      res.status(404).json({error: 'upcoming events not found'});
    }
  })

module.exports = router;