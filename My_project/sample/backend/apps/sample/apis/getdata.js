const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
exports.doService = async (jsonReq) => {
    console.log("this is do service bond");
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        const data = await sqldriver.getQuery(
            `SELECT * FROM Weather_Report where City = ?`,[jsonReq.city]
          );
        if(data)
        return {
          result: true,
          success: true,
          message: data[0],
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


const validateRequest = (jsonReq) => jsonReq;
