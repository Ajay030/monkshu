const { json } = require("express");

const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        const check_book = await sqldriver.getQuery(
            `SELECT ISBN from Books where ISBN=?`, [jsonReq.ISBN]
        )
        // check weather book is present or not here book is not present we are going the insert the book.
        if (!check_book.length) {
            const check_row = await sqldriver.getQuery(
                `SELECT ISBN from Books where Row_no =${jsonReq.Row_no} and Shelf_no =${jsonReq.Shelf_no}`
            )
            console.log(check_row);
            if (!check_row.length) {
                const insert = await sqldriver.runCmd(
                    `INSERT into Books (Name,ISBN,Category,Edition,Shelf_no,Row_no,Count) VALUES(?,?,?,?,?,?,?)`,
                    [
                        jsonReq.Name,
                        jsonReq.ISBN,
                        jsonReq.Category,
                        jsonReq.Edition,
                        jsonReq.Shelf_no,
                        jsonReq.Row_no,
                        jsonReq.Copies
                    ]
                )
                if (insert) {
                    return {
                        result: true,
                        success: true,
                        message: `successfully Inserted `
                    };
                }
            }
            else
            {
                return {
                    result: false,
                    success: false,
                    message: `place is already occupied`
                };
            }
        }
        // book is present we simply increase the count.. 
        else {
            const count = await sqldriver.getQuery(
                `SELECT Count from Books where ISBN=?`, [jsonReq.ISBN]
            )
            if (count) {
                const update_count = await sqldriver.runCmd(
                    `UPDATE Books SET Count =${count[0].Count + jsonReq.Copies} WHERE ISBN =  ${jsonReq.ISBN} ;
                `
                )
                if (update_count) {
                    return {
                        result: true,
                        success: true,
                        message: `count updated`
                    };
                }
                else {
                    return {
                        result: false,
                        success: false,
                        message: `error in inreasing count`
                    };
                }
            }
        }
        return {
            result: false,
            success: false,
            message: `failed insertion`
        };
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