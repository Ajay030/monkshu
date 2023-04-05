const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Authentication } = require('../apis/lib/auth');



exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    console.log(Authentication(jsonReq))
    if (!Authentication(jsonReq)) {
        return {
            result: false,
            success: false,
            message: `Invalid token`
        };
    }
    try {
        // decode token and get the mail;
        console.log("this is auht");
        const token = jsonReq.TOKEN;
        const decoded = jwt.verify(token, "ajaybhatheja");
        var user_mail = decoded.user_id;
        const position = await sqldriver.getQuery(
            `SELECT Role from User where Email = ?`, [user_mail]
        )
        console.log(position);
        if (position.length) {
            if (position[0].Role == "librarian") {
                return {
                    result: true,
                    success: true,
                    message: `you can enter  `
                };
            }
            else
            {
                return {
                    result: false,
                    success: false,
                    message: `you cannot access this page `
                };
            }

        }
        else {
            return {
                result: false,
                success: false,
                message: `error in getting data from token `
            };
        }
    } catch (error) {
        console.error("hii" + error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const validateRequest = (jsonReq) => jsonReq;