const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);

exports.doService = async (jsonReq) => {
    console.log("this is do service bond");
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        console.log("try block")
        const message = await getMessage(jsonReq);
        if (!message) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { message } };
    } catch (error) {
        console.error("hii"+error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const getMessage = async (jsonReq) => {
    try {
        if (jsonReq) return "This is your first API";
    } catch (error) {
        throw error;
    }
}

const validateRequest = (jsonReq) => jsonReq;
