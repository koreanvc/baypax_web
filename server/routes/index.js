'use strict';

var config = require('../config/config'),
  router = require('express').Router(),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
//layout = require('express-layout'),
  userBiz = require('../biz/userBiz');

module.exports = function (app) {
  passport.serializeUser(function (user, done) {
    console.log('serialize');
    done(null, user);
  });
  // 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
  passport.deserializeUser(function (user, done) {
    //findById(id, function (err, user) {
    console.log('deserialize');
    console.log(user);
    done(null, user);
    //});
  });
  passport.use(new LocalStrategy({
      usernameField: 'mail',
      passwordField: 'pwd',
      passReqToCallback: true
    },
    function (req, mail, pwd, done) {
      console.log('test');
      userBiz.logIn(mail, pwd, function (err, data, user) {
        if (err) {
          return done(err);
        }
        else {
          if (JSON.parse(data).code > 0) {
            var userCookie = { mail: user.user_mail, name: user.user_name, seq: user.user_seq };
            req.login(userCookie, null, function () {
              return done(null, userCookie, data);
            });
          }
          else {
            return done(null, false, data);
          }
        }
      })
    }
  ));
  app.use(passport.initialize());
  app.use(passport.session());

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else {
      res.redirect('/login?redirectUrl=' + req.url);
    }
  }

  function sendDataCallback(res, next) {
    return function (err, data) {
      if (!err) {
        res.status(200).send(data);
      } else {
        console.log(err);
        next(err);
      }
    }
  }

  // render page
  router.get('/', function (req, res, next) {
    var path = req.query.path;
    var user = req.user;
    res.render('app/index.html', { title: 'BAYPAX', path: path, user: user });
  });

  router.get('/reservation', function (req, res, next) {
    res.render('app/menu/reservation.html');
  });

  router.get('/login', function (req, res, next) {
    var redirectUrl = req.query.redirectUrl;
    redirectUrl = redirectUrl != null && redirectUrl != undefined && redirectUrl != "" ? "/?path=" + req.query.redirectUrl : "/";
    res.render('app/menu/login.html', { redirectUrl: redirectUrl });
  });

  router.get('/register', function (req, res, next) {
    res.render('app/menu/register.html');
  });

  router.get('/how', function (req, res, next) {
    res.render('app/menu/how.html');
  });

  router.get('/home', function (req, res, next) {
    res.render('app/menu/home.html');
  });

  router.get('/booking', ensureAuthenticated, function (req, res, next) {
    res.render('app/menu/booking.html',{user:req.user});
    //res.send(req.user);
  });

  router.get('/faq', function (req, res, next) {
    res.render('app/menu/faq.html');
  });

  router.get('/test', function (req, res, next) {
    res.render('app/menu/test.html');
  });

  //Saehyun code
  router.get('/partners', function (req, res, next) {
    res.render('app/menu/partners.html');
  });

  router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
  });

  router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      return res.status(200).send(info);
    })(req, res, next);
  });


  router.post('/register', function (req, res, next) {
    console.log(req);
    var params = {
      mail: req.body.mail,
      name: req.body.name,
      pwd: req.body.pwd,
      cCode: req.body.cCode
    };
    var callback = sendDataCallback(res, next);
    userBiz.register(params, callback);
  });

  router.get('/getCountry', function (req, res, next) {
    var callback = sendDataCallback(res, next);
    userBiz.GetCountry(callback);
  });

  //app.use(layout());
  //app.set('layouts','../client/app/layout');
  //app.set('layout','index.html');
  app.use(router);
};

