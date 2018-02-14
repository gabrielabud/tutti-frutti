var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-github').Strategy;

passport.use(new Strategy({
  clientID: '34d574d9a65207669a2d',
  clientSecret: '328ac42f39870ee8495ce43f2c99beeb329112d8',
  callbackURL: 'http://localhost:3000/login/callback'
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',
  passport.authenticate('github')
);

router.get('/login/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.render('profile', { user: req.user });
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

module.exports = router;
