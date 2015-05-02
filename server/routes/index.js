'use strict';

var config = require('../config/config'),
	router = require('express').Router(),
  layout=require('express-layout'),
	userBiz = require('../biz/userBiz');

module.exports = function(app) {

	function sendDataCallback(res, next) {
		return function(err, data) {
			if (!err) {
				res.status(200).send(data);
			} else {
				next(err);
			}
		}
	}

	// render page
	router.get('/', function(req, res, next) {
		// TODO: userId is always 1
		res.render('app/index.html', {title:'BAYPAX'});
	});

  router.get('/reservation', function(req, res, next) {
    res.render('app/menu/reservation.html');
  });

  router.get('/login', function(req, res, next) {
    res.render('app/menu/login.html');
  });

  router.get('/register', function(req, res, next) {
    res.render('app/menu/register.html');
  });

  router.get('/how', function(req, res, next) {
    res.render('app/menu/how.html');
  });

  router.get('/home', function(req, res, next) {
    res.render('app/menu/home.html');
  });

  router.get('/booking', function(req, res, next) {
    res.render('app/menu/booking.html');
  });

  router.get('/faq', function(req, res, next) {
    res.render('app/menu/faq.html');
  });

  router.get('/test', function(req, res, next){
    res.render('app/menu/test.html');
  });

  //Saehyun code
  router.get('/partners', function(req, res, next){
    res.render('app/menu/partners.html');
  });

  router.post('/login',function(req,res,next){
    var mail=req.body.userId;
    var pwd=req.body.pwd;
    console.log(mail+'/'+pwd);
    var callback=sendDataCallback(res,next);
    userBiz.logIn(mail,pwd,callback);
  });

  router.post('/register',function(req,res,next){
    var mail=req.body.userId;
    var name=req.body.userName;
    var pwd=req.body.pwd;
    console.log(mail+name+pwd);
    var callback=sendDataCallback(res,next);
    userBiz.register(mail,name,pwd,callback);

  });

	/*
  router.post('/signIn',function(req,res,next){

    var userId = req.body.userId;
    var pwd = req.body.pwd;
    var callback = sendDataCallback(res, next);
    console.log('signIn/'+userId+'/'+pwd);
    if(userId && pwd){
      member.signIn(userId,pwd,callback);
    } else{
      callback(new InvalidArgumentError('Invalid Parameters'));
    }
  });

  router.get('/signUp',function(req,res,next){
    console.log('signUpView/');
    res.render('app/signUp.html');
  });

  router.post('/signUp',function(req,res,next){
    var userId = req.body.userId;
    var pwd = req.body.pwd;
    var cPwd = req.body.cPwd;
    console.log('signUp/'+userId+'/'+pwd);
    var callback = sendDataCallback(res,next);
    if(userId && pwd && cPwd){
      if(userId.length<3 || userId.length>10||pwd.length<3 || pwd.length>10||pwd!=cPwd){
        callback(new InvalidArgumentError('Invalid Parameters'));
      }
      member.signUp(userId,pwd,callback);
    }
    else{
      callback(new InvalidArgumentError('Invalid Parameters'));
    }
  });

  router.get('/gameView/:userId',function(req,res,next){
    var userId = req.params.userId;
    console.log('gameView/'+userId);
    res.render('app/gameView.html',{
      data:{userId:userId}
    });
  });

  router.post('/gameView/roll', function (req, res, next) {

    var userId = req.body.userId;;
    var score = parseInt(req.body.roll);
    var callback = sendDataCallback(res, next);
    console.log('gameView/roll/'+userId+'/score:'+score);
    if (userId && score || score == 0) {
      roll.add(userId, score, callback);
    } else {
      callback(new InvalidArgumentError('Invalid Parameters'));
    }
  });

  router.post('/gameView/newGame', function (req, res, next) {

    var userId = req.body.userId;;
    var callback = sendDataCallback(res, next);
    console.log('gameView/newGame/'+userId);
    if (userId) {
      game.newGame(userId, callback);
    } else {
      callback(new InvalidArgumentError('Invalid Parameters'));
    }
  });

  router.post('/gameView/loadGame', function (req, res, next) {

    var userId = req.body.userId;;
    var callback = sendDataCallback(res, next);
    console.log('gameView/loadGame/'+userId);
    if (userId) {
      game.loadGame(userId, callback);
    } else {
      callback(new InvalidArgumentError('Invalid Parameters'));
    }
  });

  router.get('/historyView/:userId',function(req,res,next){
    var userId = req.params.userId;
    console.log('historyView/'+userId);
    res.render('app/historyView.html',{
      data:{userId:userId}
    });
  });

  router.post('/historyView/loadHistory', function (req, res, next) {

    var userId = req.body.userId;;
    var callback = sendDataCallback(res, next);
    console.log('historyView/loadHistory/'+userId);
    if (userId) {
      history.loadHistory(userId, callback);
    } else {
      callback(new InvalidArgumentError('Invalid Parameters'));
    }
  });

  router.post('/historyView/deleteGame', function (req, res, next) {
    
    var gameId = req.body.gameId;;
    var callback = sendDataCallback(res, next);
    console.log('historyView/deleteGame/'+gameId);
    if (gameId) {
      history.deleteGame(gameId, callback);
    } else {
      callback(new InvalidArgumentError('Invalid Parameters'));
    }
  });


*/
	// use router
  //app.use(layout());
  //app.set('layouts','../client/app/layout');
  //app.set('layout','index.html');
	app.use(router);
};