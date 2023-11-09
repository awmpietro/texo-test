const Datastore = require('nedb');
const path = require('path');

/**
 * @var db
 * @description An instance of Datastore, configured for in-memory use. This datastore will be used for storing and querying application data. Since it's set to 'inMemoryOnly', it does not persist data to disk and all data will be lost when the application restarts. Ideal for development, testing, or temporary data storage scenarios.
 */
const db = new Datastore({ inMemoryOnly: true });

/**
 * @function insertMovies
 * @description Inserts a list of movie records into the database. On encountering any errors during insertion, it delegates the error handling to a middleware.
 * @param {Array} movies - An array of movie objects to be inserted into the database.
 */
function insertMovies(movies) {
   db.insert(movies, (err) => {
      if (err) {
         console.error('error inserting documents:', err);
      }
   });
}

module.exports = { db, insertMovies };
