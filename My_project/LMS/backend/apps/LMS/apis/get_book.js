const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);

exports.doService = async (jsonReq) => {
    const show = await sqldriver.getQuery(
        `SELECT * From Books`
    )
    if(show.length)
    {
        return {
            result: true,
            success: true,
            message: show
        };  
    }
    else
    {
        return {
            result: true,
            success: true,
            message: `NO book present in database `
        };  
    }
}
