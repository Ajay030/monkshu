const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);

exports.doService = async (jsonReq) => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq))
        return ({
            result: false,
            success: false,
            message: 'Please provide city name ',
        });
    try {
        const Delete = await sqldriver.runCmd(
            `DELETE FROM Weather_Report WHERE City=?`,
            [jsonReq.city]
        )
        if (Delete)
        {
            console.log(Delete);
            return {
                result: true,
                success: true,
                message: 'Task deleted successfully',
              };
        }
      }
      catch (error) {
        console.error(error);
        return {
          result: false,
          success: false,
          message: 'Api error',
          error: API_CONSTANTS.API_RESPONSE_SERVER_ERROR,
        };
      }
}

const validateRequest = (jsonReq) => jsonReq;
