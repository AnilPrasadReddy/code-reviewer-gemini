const express = require('express');
const Router = express.Router();
const codeReview = require('../controllers/ai.controllers');
const generateContent = require('../services/ai.services');

Router.post('/get-review',codeReview)

module.exports=Router;