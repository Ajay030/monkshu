const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
const bcrypt = require("bcryptjs");

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const check = await sqldriver.getQuery(
            `SELECT Password FROM User where Email = ?`,[jsonReq.Email]
        );
        console.log(JSON.stringify(check));
        if (check) {
            const isValidPassword = bcrypt.compareSync(jsonReq.Password, JSON.stringify(check));
            console.log("validity",isValidPassword)
            if (isValidPassword) {
                return {
                    result: true,
                    success: true,
                    message: `successfully login `
                };
            }
        }
        return {
            result: false,
            success: false,
            message: `failed login`
        };
    } catch (error) {
        console.error("hii" + error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const validateRequest = (jsonReq) => jsonReq;