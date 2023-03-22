const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
exports.doService = async (jsonReq) => {
    console.log("this is do service bond");
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        sqldriver.runCmd(
          `CREATE TABLE ${jsonReq.teamName} ( Weather text NOT NULL UNIQUE, Temperature text NOT NULL, Pressure integer NOT NULL, Humidity text NOT NULL, Speed text NOT NULL, Sunrise text NOT NULL)`
        );
        return {
          result: true,
          success: true,
          message: `Table:${jsonReq.teamName}, created successfully`,
        };
      } catch (error) {
        console.error(error);
        return {
          result: false,
          success: false,
          message: 'API error',
          error: API_CONSTANTS.API_RESPONSE_SERVER_ERROR,
        };
      }
}

// const getMessage = async (jsonReq) => {
//     try {
//         if (jsonReq) return "This is your first API";
//     } catch (error) {
//         throw error;
//     }
// }

const validateRequest = (jsonReq) => jsonReq;
