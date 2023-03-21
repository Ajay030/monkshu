/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const getWeather = async () => {
    
    let jsonReq = {}
    jsonReq.city = app_weather.shadowRoot.querySelector("#weather").value;
    // jsonReq.company = window.company
    console.log(jsonReq);
    let resp = await apiman.rest(APP_CONSTANTS.API_WEATHER, "POST", jsonReq, true);
    if (!resp.result) router.reload();
    console.log(resp.results.message);

    //create custom object...

    let jsonRes = {}
    jsonRes.weather = resp.results.message.weather[0].main;
    jsonRes.temp = resp.results.message.main.temp;
    jsonRes.pressure = resp.results.message.main.pressure;
    jsonRes.humidity = resp.results.message.main.humidity;
    jsonRes.speed = resp.results.message.wind.speed;
    jsonRes.sunrise = resp.results.message.sys.sunrise;    
    //adding values ....

    app_weather.shadowRoot.querySelector("#wh").innerHTML = JSON.stringify(jsonRes.weather);
    app_weather.shadowRoot.querySelector("#tm").innerHTML = JSON.stringify(jsonRes.temp);
    app_weather.shadowRoot.querySelector("#pr").innerHTML = JSON.stringify(jsonRes.pressure);
    app_weather.shadowRoot.querySelector("#hu").innerHTML = JSON.stringify(jsonRes.humidity);
    app_weather.shadowRoot.querySelector("#sp").innerHTML = JSON.stringify(jsonRes.speed);
    app_weather.shadowRoot.querySelector("#sr").innerHTML = JSON.stringify(jsonRes.sunrise);

    app_weather.shadowRoot.querySelector("#tab").style.visibility = "visible";
}

//mandatory
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-weather", `${APP_CONSTANTS.APP_PATH}/components/app-weather/app-weather.html`, app_weather);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_weather = { trueWebComponentMode, register, getWeather }