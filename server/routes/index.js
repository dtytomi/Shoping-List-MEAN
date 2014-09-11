(function() {

   'use strict';
   var express = require('express');
   var router = express.Router();
   var mongojs = require('mongojs');
   var db = mongojs('shopList', ['list']);

   /* GET home page. */
   router.get('/', function(req, res) {
      res.render('index');
   });

   router.get('/api/shopping', function(req, res){
      db.list.find(function(err, data){
         res.json(data);
      });
   });

   router.post('/api/shopping', function(req, res){
      db.list.insert(req.body, function(err, data){
         res.json(data);
      });
   });

   router.put('/api/shopping', function( req, res){
      
      db.list.update({
         _id: mongojs.ObjectId(req.body._id)
      }, {
         isCompleted: req.body.isCompleted,
         list: req.body.list
      }, {}, function(err, data){
         res.json(data);
      });

   });

      router.delete('/api/shopping/:_id', function(req, res){
         
         db.list.remove({
            _id:mongojs.ObjectId(req.params._id)
         }, '', function(err, data){
            res.json(data);
         });
      });

      module.exports = router;
      
}());