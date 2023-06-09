/**
 * db.js - DB layer. Auto creates the DB with the DDL if needed.
 *
 * (C) 2020 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */
const fs = require('fs');
const util = require('util');
const sqlite3 = require('sqlite3');
const mkdirAsync = util.promisify(fs.mkdir);
const accessAsync = util.promisify(fs.access);
const API_CONSTANTS = require(`${__dirname}/constants.js`);

const DB_CREATION_SQLS = [
  'CREATE TABLE User (ID INTEGER PRIMARY KEY AUTOINCREMENT,First_name text , Last_name text , Email text NOT NULL UNIQUE, Password text NOT NULL , Join_date text ,Role text)',
  'CREATE TABLE Author(ID INTEGER PRIMARY KEY AUTOINCREMENT,Name text NOT NULL UNIQUE)',
  'CREATE TABLE Book_author(ID INTEGER PRIMARY KEY AUTOINCREMENT,Book_id INTEGER,Author_id INTEGER,FOREIGN KEY(Book_id) REFERENCES Books(ID),FOREIGN KEY(Author_id) REFERENCES Author(ID))',
  'CREATE TABLE Books (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name text ,ISBN INTEGER,Category text,Edition INTEGER ,Shelf_no INTEGER,Row_no INTEGER , Count INTEGER)',
  'CREATE TABLE Transactions (ID INTEGER PRIMARY KEY AUTOINCREMENT, Id_book INTEGER , User_id INTEGER,Borrow_date text , Status text,FOREIGN KEY(Id_book) REFERENCES Books(ID),FOREIGN KEY(User_id) REFERENCES User(ID) )'
];

const DB_PATH = API_CONSTANTS.DB_PATH;

let dbInstance, dbRunAsync, dbAllAsync;

/**
 * Runs the given SQL command e.g. insert, delete etc.
 * @param {string} cmd The command to run
 * @param {array} params The params for SQL
 * @return true on success, and false on error
 */
exports.runCmd = async (cmd, params = []) => {
  await _initDB();
  params = Array.isArray(params) ? params : [params];
  try {
    let temp=await dbRunAsync(cmd, params);
      return true;
  } catch (err) {
    console.error(
      `DB error running, ${cmd}, with params ${params}, error: ${err}`
    );
    return false;
  }
};

/**
 * Runs the given query e.g. select and returns the rows from the result.
 * @param {string} cmd The command to run
 * @param {array} params The params for SQL
 * @return rows array on success, and false on error
 */
exports.getQuery = async (cmd, params = []) => {
  await _initDB();
  params = Array.isArray(params) ? params : [params];
  try {
    return await dbAllAsync(cmd, params);
  } catch (err) {
    console.error(
      `DB error running, ${cmd}, with params ${params}, error: ${err}`
    );
    return false;
  }
};

async function _initDB() {
  if (!(await _createDB())) return false;
  if (!(await _openDB())) return false;
  else return true;
}

async function _createDB() {
  try {
    await accessAsync(DB_PATH, fs.constants.F_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    // db doesn't exist
    console.error("DB doesn't exist, creating and initializing");
    try {
      await mkdirAsync(`${API_CONSTANTS.DB_FOLDER_PATH}`);
    } catch (err) {
      if (err.code != 'EEXIST') {
        console.error(`Error creating DB dir, ${err}`);
        return false;
      }
    }
    if (!(await _openDB())) return false; // creates the DB file

    for (const dbCreationSQL of DB_CREATION_SQLS)
      try {
        await dbRunAsync(dbCreationSQL, []);
      } catch (err) {
        console.error(
          `DB creation DDL failed on: ${dbCreationSQL}, due to ${err}`
        );
        return false;
      }
    console.info('DB created successfully.');
    return true;
  }
}

function _openDB() {
  return new Promise((resolve) => {
    if (!dbInstance)
      dbInstance = new sqlite3.Database(
        DB_PATH,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
          if (err) {
            console.error(`Error opening DB, ${err}`);
            dbInstance = null;
            resolve(false);
          } else {
            dbRunAsync = util.promisify(dbInstance.run.bind(dbInstance));
            dbAllAsync = util.promisify(dbInstance.all.bind(dbInstance));
            resolve(true);
          }
        }
      );
    else resolve(true);
  });
}