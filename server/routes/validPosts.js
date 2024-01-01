const joi = require('joi');
const express = require('express');

async function validateAddPost(req, res, next) {
  const schema = joi.object({
    userId: joi.number().required().not().allow(null), 
    title: joi.string().required(),
    body: joi.string().required()
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).send(validationResult.error); 
  } else {
    next(); 
  }
};

module.exports = {
  validateAddPost: validateAddPost,
};






