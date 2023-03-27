const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);
exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq.Tablename)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        sqldriver.runCmd(
          `CREATE TABLE ${jsonReq.Tablename} (  ID INTEGER PRIMARY KEY AUTOINCREMENT,First_name text NOT NULL, Last_name text NOT NULL, Email text NOT NULL, Password text NOT NULL, Speed text NOT NULL, Sunrise text NOT NULL)`
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
