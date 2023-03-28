const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const fetch = require("node-fetch");
const sqldriver = require(API_CONSTANTS.SQL_DRIVER_PATH);

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return { "result": "false" };

    try {
        const message = await getWeather(jsonReq);
        console.log(JSON.stringify( message));
        if (!message) return API_CONSTANTS.API_RESPONSE_FALSE;
        const insertTask = await sqldriver.runCmd(
            `Insert into Weather_Report(City, Weather, Temperature,Pressure,Humidity,Speed,Sunrise) VALUES (?,?,?,?,?,?,?)`,
            [
                message.name,
                message.weather[0].main,
                message.main.temp,
                message.main.pressure,
                message.main.humidity,
                message.wind.speed,
                message.sys.sunrise
            ]
          );
        if(insertTask)
        return {
          result: true,
          success: true,
          message: `data inserted successfully`,
          results: { message }
        };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const getWeather = async (jsonReq) => {
    if (jsonReq) {
        console.log(jsonReq.city);
        var ans = fetch(`https://api.openweathermap.org/data/2.5/weather?appid=bf02a7efa463b77e1dc071ba0c63ba5b&q=${jsonReq.city}`)
            .then(response => {
                return response.json()})
            .catch(error => {
                return error;
            });
            return ans;
    }
    else {
        console.log("else block")
        return "no req found";
    }
}

const validateRequest = (jsonReq) => jsonReq;
