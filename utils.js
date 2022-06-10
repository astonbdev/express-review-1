const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  for(num in strNums){
    strNums[num] = Number(strNums[num]);

    if(isNaN(strNums[num])){
      throw new BadRequestError("Non-number in query")
    }
  }

  return strNums;
}


module.exports = { convertStrNums };