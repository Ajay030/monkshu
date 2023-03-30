const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/LMS/apis/lib/constants`);
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        if (jsonReq.type == "borrow") {
            const insert = await sqldriver.runCmd(
                `INSERT into Transactions(Id_book , User_id , Borrow_date,Status) VALUES (?,?,?,?)`, [
                jsonReq.Book_id,
                jsonReq.User_id,
                jsonReq.Date,
                "Borrow"
            ]
            )
            if (insert) {
                const book_count = await sqldriver.getQuery(
                    `SELECT Count from Books where ID =?`, [jsonReq.Book_id]
                )
                if (book_count[0].Count >= 1) {
                    const update = await sqldriver.runCmd(
                        `UPDATE Books set Count = ${book_count[0].Count - 1} where ID = ${jsonReq.Book_id}`
                    )
                    if (update) {
                        return {
                            result: true,
                            success: true,
                            message: `Borrow succesfull and count also updated `
                        };
                    }
                    else {
                        return {
                            result: true,
                            success: true,
                            message: `book count is not updated `
                        };
                    }

                }
                else {
                    return {
                        result: true,
                        success: true,
                        message: `book count is not enough`
                    };
                }
            }
            else {
                return {
                    result: true,
                    success: true,
                    message: `transaction failed `
                };

            }
        }

        // here transaction is return type ...
        else if (jsonReq.type == "return") {
            const insert = await sqldriver.runCmd(
                `INSERT into Transactions(Id_book , User_id , Borrow_date,Status) VALUES (?,?,?,?)`, [
                jsonReq.Book_id,
                jsonReq.User_id,
                jsonReq.Date,
                "Borrow"
            ]
            )
            if (insert) {
                const book_count = await sqldriver.getQuery(
                    `SELECT Count from Books where ID =?`, [jsonReq.Book_id]
                )
                if (book_count[0].Count >= 0) {
                    const update = await sqldriver.runCmd(
                        `UPDATE Books set Count = ${book_count[0].Count + 1} where ID = ${jsonReq.Book_id}`
                    )
                    if (update) {
                        return {
                            result: true,
                            success: true,
                            message: `return succesfull and count also updated `
                        };
                    }
                    else {
                        return {
                            result: true,
                            success: true,
                            message: `book count is not updated `
                        };
                    }

                }
                else {
                    return {
                        result: true,
                        success: true,
                        message: `error in getting the count of books`
                    };
                }
            }
            else {
                return {
                    result: true,
                    success: true,
                    message: `transaction failed `
                };

            }

        }
    } catch (error) {
        console.error("hii" + error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const validateRequest = (jsonReq) => jsonReq;