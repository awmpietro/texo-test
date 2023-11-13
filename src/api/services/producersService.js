/**
 * @function getAwardIntervalsService
 * @description Calculates the longest and shortest intervals between awards for each producer. It processes a list of award-winning producers and determines the producer with the longest interval between two consecutive awards and the one with the shortest interval.
 * @param {Array} docs - An array of document objects, each representing a producer's award record.
 * @returns {Object} An object containing two properties: 'min' and 'max', each an array. 'min' holds the producer(s) with the shortest award interval, and 'max' contains the producer(s) with the longest interval.
 */
const getAwardIntervalsService = (docs) => {
   if (!docs || docs.length === 0) {
      return { min: [], max: [] };
   }

   let producerWins = {};

   // Group by producer and collect years of wins
   docs.forEach((doc) => {
      if (doc.winner) {
         let producers = doc.producers.split(/, | and /);
         producers.forEach((producer) => {
            producer = producer.trim()
            if (!producerWins[producer]) {
               producerWins[producer] = [];
            }
            producerWins[producer].push(parseInt(doc.year));
         });
      }
   });

   // Check if there is any producer with more than one win
   let isMultipleWins = Object.values(producerWins).some((years) => years.length > 1);

   if (!isMultipleWins) {
      return { min: [], max: [] };
   }

   let maxIntervals = [];
   let minIntervals = [];
   let minIntervalLength = Infinity;
   let maxIntervalLength = 0;

   // Algo for calculating intervals
   for (let producer in producerWins) {
      let years = producerWins[producer].sort((a, b) => a - b);
      for (let i = 0; i < years.length - 1; i++) {
         let interval = years[i + 1] - years[i];

         if (interval > maxIntervalLength) {
            maxIntervalLength = interval;
            maxIntervals = [{ producer, interval, previousWin: years[i], followingWin: years[i + 1] }];
         } else if (interval === maxIntervalLength) {
            maxIntervals.push({ producer, interval, previousWin: years[i], followingWin: years[i + 1] });
         }

         if (interval < minIntervalLength) {
            minIntervalLength = interval;
            minIntervals = [{ producer, interval, previousWin: years[i], followingWin: years[i + 1] }];
         } else if (interval === minIntervalLength) {
            minIntervals.push({ producer, interval, previousWin: years[i], followingWin: years[i + 1] });
         }
      }
   }

   return {
      min: minIntervalLength !== Infinity ? minIntervals : [],
      max: maxIntervalLength !== 0 ? maxIntervals : [],
   };
};

module.exports = { getAwardIntervalsService };
