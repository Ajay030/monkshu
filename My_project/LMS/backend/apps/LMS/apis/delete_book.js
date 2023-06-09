const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    const isbn = await sqldriver.getQuery(
        `SELECT Count from Books where ISBN =?`, [jsonReq.ISBN]
    )
    console.log(JSON.stringify(isbn))
    if (isbn.length == 0) {
        return {
            result: true,
            success: true,
            message: `no book of this isbn is present `
        };
    }
    else if (isbn[0].Count > 1) {
        const count = await sqldriver.runCmd(
            `UPDATE Books SET Count =${isbn[0].Count - 1} WHERE ISBN =  ${jsonReq.ISBN} ;`
        )
        if(count)
        {
            return {
                result: true,
                success: true,
                message: `Deletion successful count decrese`
            };   
        }
    }
    else {
        const del = await sqldriver.runCmd(
            `DELETE from Books where ISBN = ?`, [jsonReq.ISBN]
        )
        if (del) {
            return {
                result: true,
                success: true,
                message: `Deletion successful`
            };
        }
    }
}

const validateRequest = (jsonReq) => jsonReq;