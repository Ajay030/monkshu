const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
const bcrypt = require("bcryptjs");

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq )) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const checkTable = await sqldriver.runCmd(
            `CREATE TABLE User (ID INTEGER PRIMARY KEY AUTOINCREMENT,First_name text , Last_name text , Email text NOT NULL UNIQUE, Password text NOT NULL , Join_date text ,Role text)`
        );

        encryptedPassword = await bcrypt.hash(jsonReq.Password, 10);

        const insertTask = await sqldriver.runCmd(
            `Insert into User (First_name, Last_name, Email,Password,Join_date) VALUES (?,?,?,?,?)`,
            [
                jsonReq.First_name,
                jsonReq.Last_name,
                jsonReq.Email,
                encryptedPassword,
                jsonReq.Join_date
            ]
        );
        if(insertTask)
        {
            return {
                result: true,
                success: true,
                message: `successfully Inserted `
              };
        }
    } catch (error) {
        console.error("hii" + error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const validateRequest = (jsonReq) => jsonReq.Email && jsonReq.First_name && jsonReq.Password ;