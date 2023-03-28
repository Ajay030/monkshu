/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/
const path = require("path");
APP_ROOT = `${path.resolve(`${__dirname}/../../`)}`;
exports.APP_ROOT = APP_ROOT;
exports.CONF_DIR = `${APP_ROOT}/conf`;
// LIB_PATH: Location to APIs lib directory
exports.LIB_PATH = path.resolve(__dirname + "/../lib");
// Simple API Response for success or failure
exports.API_RESPONSE_TRUE = { result: true };
exports.API_RESPONSE_FALSE = { result: false };
 
// db connection
exports.API_INSUFFICIENT_PARAMS = 'insufficient params';

//sql driver path
exports.SQL_DRIVER_PATH = path.resolve(
  __dirname + '/../lib/' + 'sql_driver.js'
);

exports.SCHEMAS_PATH = path.resolve(
  __dirname + '/../conf/' + 'table_schemas.json'
);

exports.DB_PATH = '/home/shaitaanop/Documents/task2/task.db';
exports.DB_FOLDER_PATH = '/home/shaitaanop/Documents/task2';