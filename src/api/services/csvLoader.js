const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { insertMovies } = require('../config/db');

/**
 * @function loadCSVData
 * @description Reads and processes a CSV file from the given file path. It parses each row into an object, converts the 'winner' field to a boolean,
 * and then stores each object in an array. After processing the entire file, it inserts the processed data into the database. In case of errors during processing,
 * it logs the error and can invoke a callback with the error. It will return empty if no data or if any producer has not won more than once.
 * @param {string} filePath - The path to the CSV file to be processed.
 * @param {function} [callback] - An optional callback function to be executed after processing the file. It receives an error as an argument if there is any error during processing.
 */
const loadCSVData = (filePath, callback) => {
   const movies = [];
   fs.createReadStream(filePath)
      .pipe(
         csvParser({
            separator: ';',
            mapHeaders: ({ header }) => header.trim(),
            mapValues: ({ value }) => value.trim(),
         })
      )
      .on('data', (data) => {
         if (data.winner && data.winner.toLowerCase() === 'yes') {
            data.winner = true;
         } else {
            data.winner = false;
         }
         movies.push(data);
      })
      .on('end', () => {
         console.log('csv file successfully processed');
         insertMovies(movies);
         if (callback) callback();
      })
      .on('error', (error) => {
         console.error('error processing csv file', error);
         if (callback) callback(error);
      });
};

module.exports = { loadCSVData };
