const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Authentication } = require('../apis/lib/auth');



exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    if(!Authentication(jsonReq))
    {
        return {
            result: false,
            success: false,
            message: `Invalid token`
        };
    }
    try {
        // decode token and get the mail;
        const token = jsonReq.TOKEN;
        const decoded = jwt.verify(token, "ajaybhatheja");
        var user_mail = decoded.user_id;
        const id = await sqldriver.getQuery(
            `SELECT ID from User where Email = ?`, [user_mail]
        )
        if(id.length)
        {
            console.log(id[0].ID);
            const row = await sqldriver.getQuery(
                `SELECT * from Transactions where User_id = ? `,[id[0].ID]
            )
            if(row.length)
            {
                return {
                    result: true,
                    success: true,
                    message: row
                }; 
            }
            else {
                return {
                    result: true,
                    success: true,
                    message: "error ....."
                }; 
            }; 
        }
        else
        {
            return {
                result: true,
                success: true,
                message: `error in getting data from token `
            };   
        }
    } catch (error) {
        console.error("hii" + error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const validateRequest = (jsonReq) => jsonReq;