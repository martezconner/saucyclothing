const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
// uncomment keys if using env variables
const keys = require('../config/keys');

const multer     = require('multer');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./models/User');
require('./models/Product');

// require('./services/passport')(passport);

// require models under here
// import routes
require ('./routes/web')(app);
require ('./routes/authRoutes')(app);
// require ('./routes/adminRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3443
app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
