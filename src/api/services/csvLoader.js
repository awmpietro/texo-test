const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const csvParser = require('csv-parser');
const { insertMovies } = require('../config/db');

/**
 * @function loadCSVData
 * @description Reads and processes a CSV file. It parses each row into an object, converts the 'winner' field to a boolean,
 * and then stores each object in an array. After processing the entire file, it inserts the processed data into the database. In case of errors during processing,
 * it logs the error and can invoke a callback with the error. It will return empty if no data or if any producer has not won more than once.
 * @param {string} filePath - The path to the folder where CSV is located.
 * @param {function} [callback] - An optional callback function to be executed after processing the file. It receives an error as an argument if there is any error during processing.
 */
const loadCSVData = async () => {
   const firstCSVFile = await findFirstCSVFile();
   const movies = [];

   return new Promise((resolve, reject) => {
      fs.createReadStream(firstCSVFile)
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
            insertMovies(movies);
            resolve(movies);
         })
         .on('error', (error) => {
            console.error('error processing csv file', error);
            reject(error);
         });
   });
};

/**
 * @async
 * @function findFirstCSVFile
 * @description Searches for the first CSV file in the specified directory and returns its path.
 * The function constructs the path to the 'data' directory relative to the current script's location.
 * It then reads the contents of the directory, filters the files to find those with a '.csv' extension,
 * and returns the path to the first CSV file found. If no CSV files are found, an error is thrown.
 * Any errors encountered during directory reading or file filtering are caught and re-thrown after logging.
 * @returns {Promise<string>} A promise that resolves with the path of the first CSV file found.
 * @throws {Error} Throws an error if no CSV files are found in the directory or if there's an error reading the directory.
 */
const findFirstCSVFile = async () => {
   try {
      const dataPath = path.join(__dirname, '../data/');
      const files = await fsp.readdir(dataPath);
      const csvFiles = files.filter((file) => file.endsWith('.csv'));

      if (csvFiles.length === 0) {
         throw new Error('no csv files found');
      }
      return path.join(dataPath, csvFiles[0]);
   } catch (error) {
      console.error('error reading directory:', error);
      throw error;
   }
};

module.exports = { loadCSVData };
