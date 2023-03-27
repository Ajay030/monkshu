const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
const bcrypt = require("bcryptjs");

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const checkTable = await sqldriver.runCmd(
            `CREATE TABLE IF NOT EXISTS User ( ID INTEGER PRIMARY KEY AUTOINCREMENT,First_name text NOT NULL, Last_name text NOT NULL, Email text NOT NULL, Password text NOT NULL)`
        );

        encryptedPassword = await bcrypt.hash(jsonReq.Password, 10);

        const insertTask = await sqldriver.runCmd(
            `Insert into User (First_name, Last_name, Email,Password) VALUES (?,?,?,?)`,
            [
                jsonReq.First_name,
                jsonReq.Last_name,
                jsonReq.Email,
                encryptedPassword
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

const validateRequest = (jsonReq) => jsonReq;