const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq.Tablename)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        sqldriver.runCmd(
          `CREATE TABLE ${jsonReq.Tablename} ( City text NOT NULL UNIQUE, Weather text NOT NULL, Temperature text NOT NULL, Pressure integer NOT NULL, Humidity text NOT NULL, Speed text NOT NULL, Sunrise text NOT NULL)`
        );
        return {
          result: true,
          success: true,
          message: `Table:${jsonReq.Tablename}, created successfully`,
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
