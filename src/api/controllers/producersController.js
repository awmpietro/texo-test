const { db } = require('../config/db');
const { ErrorHandler } = require('../middleware/ErrorHandler');
const { getAwardIntervalsService } = require('../services/producersService');

/**
 * @function getAwardIntervals
 * @description Endpoint to obtain the producer with the longest interval between two consecutive awards, and the one who achieved two awards in the shortest time.
 * @param {Object} req - Express's request object, representing the HTTP request.
 * @param {Object} res - Express's response object, used to send back the desired HTTP response.
 * @param {function} next - Express middleware's next function, used to continue the flow or catch errors.
 */
const getAwardIntervals = async (req, res, next) => {
   try {
      db.find({}, function (err, docs) {
         if (err) {
            console.error('error getting data from database:', err);
            next(new ErrorHandler(500, 'error retrieving data from the database'));
         } else {
            const intervals = getAwardIntervalsService(docs);
            if (intervals.min.length === 0 && intervals.max.length === 0) {
               res.status(204).send();
            } else {
               res.json(intervals);
            }
         }
      });
   } catch (err) {
      next(new ErrorHandler(500, 'an unexpected error occurred'));
   }
};

module.exports = { getAwardIntervals };
