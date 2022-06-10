/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums } = require("./utils.js");
const { findMean, findMedian, findMode } = require("./stats.js");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res, next){
  if(req.query.nums === undefined){
    throw new BadRequestError(MISSING);
  }

  let nums = req.query.nums.split(",");
  nums = convertStrNums(nums);

  const mean = findMean(nums);
  return res.status(400).json({
    response: {
      operation: "mean",
      value: mean}
    });
});

app.get("/median", function(req, res, next){
  if(req.query.nums === undefined){
    throw new BadRequestError(MISSING);
  }

  let nums = req.query.nums.split(",");
  nums = convertStrNums(nums);

  const median = findMedian(nums);
  return res.status(400).json({
    response: {
      operation: "median",
      value: median}
    });
});

app.get("/mode", function(req, res, next){
  if(req.query.nums === undefined){
    throw new BadRequestError(MISSING);
  }

  let nums = req.query.nums.split(",");
  nums = convertStrNums(nums);

  const mode = findMode(nums);
  return res.status(400).json({
    response: {
      operation: "mode",
      value: mode}
    });
});

app.get("/all", function (req, res, next){
  if(req.query.nums === undefined){
    throw new BadRequestError(MISSING);
  }

  let nums = req.query.nums.split(",");
  nums = convertStrNums(nums);

  all = {
    operation: "all",
    mean: findMean(nums),
    median: findMedian(nums),
    mode: findMode(nums)
  }

  return res.status(400).json({
    response : all
  });
});


/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;