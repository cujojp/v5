var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();
var Firebase = require('../gulp/utils/firebase-node');
var FirebaseTokenGenerator = require("../gulp/utils/firebase-token-generator");
var firebase = new Firebase('https://cujojp.firebaseio.com');

/* GET Home page. */
router.get('/', function(req, res) {
  firebase.once('value', function(snap) {
    req.db = snap.val();

    res.render('index', { data: req.db });
  });
});

module.exports = router;
