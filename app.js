const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error);
      res.send('Error retrieving beers');
    });
});

app.get('/beers/:id', (req, res) => {
  const beerId = req.params.id;

  punkAPI
    .getBeer(beerId)
    .then(beer => {
      res.render('beer-details', { beer });
    })
    .catch(error => {
      console.log(error);
      res.send('Error retrieving beer details');
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const randomBeer = responseFromAPI[0];
      console.log('Random beer from the database:', randomBeer);
      res.render('random-beer', { beer: randomBeer });
   
    })
    .catch(error => {
      console.error(error);
      res.send('An error occurred while retrieving a random beer.');
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
