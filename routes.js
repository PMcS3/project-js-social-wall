let Router = require('express-promise-router');
let { Message } = require('./models');
let { ValidationError } = require('objection');
var $ = require('jQuery');
const fetch = require('node-fetch');
const { json } = require('express');

let router = new Router();



router.get('/api', async(request, response) => {
  
  response.json({
    message: "hello"
  });
});

router.get('/api/trails/:city?/:state?', async(request, response) => {
  //console.log(request.params);
  let city = request.params.city;
  let state = request.params.state;
  let osmURL = `https://nominatim.openstreetmap.org/search?city=${city}&state=${state}&format=json`;
  let u = "https://nominatim.openstreetmap.org/search?city=bedford&state=new+york&format=json";
  let osm = getOSM();
  let test = JSON.stringify(osm);
  console.log(osm);
  let lat = osm.lat;
  let lon = osm.lon;

  async function getOSM() {
    await fetch(u)
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
  }
  
  // hit OSM server with city, state
  // store lat/long
  // add new fields to response.json for lat/long
  let data = [];
  response.json({
    lat: lat,
    lon: lon
    //city: request.params.city,
    //state: request.params.state,
  });
});



// GET /

router.get('/', async(request, response) => {
  //let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
  response.render('index');
});
/*
router.get('/', async(request, response) => {
  let messages = await Message.query().select('*').orderBy('created_at', 'ASC');
  response.render('index', {messages});
});


router.get('/', async(request, response) => {
  let messages = await Message.query().select('*').where('likes', 'like', '%Test%').orderBy('created_at', 'ASC');
  response.render('index', {messages});
});


router.post('/likes', async(request, response) => {
  console.log(request);
  let messageID = request.body.messageId;
  let currentLikes = parseInt(request.body.likes);
  try {
    await Message.query().where({id:messageID}).patch({
      likes: currentLikes + 1
    });
    response.redirect('/');
  } catch(error) {
    if (error instanceof ValidationError) {
      let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
      let errors = error.data;

      response.render('index', { messages, errors });
    } else {
      throw error;
    }
  }

});


router.post('/messages', async(request, response) => {
  let messageBody = request.body.body;
  let messageTime = new Date();
  let messageLikes = parseInt(request.body.likes);
  try {
    await Message.query().insert({
      body: messageBody,
      createdAt: messageTime,
      likes: messageLikes
    });

    response.redirect('/');
  } catch(error) {
    if (error instanceof ValidationError) {
      let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
      let errors = error.data;

      response.render('index', { messages, errors });
    } else {
      throw error;
    }
  }
});

/*
$(document).on("click", ".likeButton", function(e) {
  e.preventDefault();
  console.log('Button Clicked');
});
*/

module.exports = router;
