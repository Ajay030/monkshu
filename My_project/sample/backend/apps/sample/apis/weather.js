const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const fetch = require("node-fetch");

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return { "result": "false" };

    try {
        const message = await getWeather(jsonReq);
        if (!message) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { message } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const getWeather = async (jsonReq) => {
    if (jsonReq) {
        console.log(jsonReq.city);
        return fetch(`https://api.openweathermap.org/data/2.5/weather?appid=bf02a7efa463b77e1dc071ba0c63ba5b&q=${jsonReq.city}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }
    else {
        console.log("else block")
        return "no req found";
    }
}

const validateRequest = (jsonReq) => jsonReq;
