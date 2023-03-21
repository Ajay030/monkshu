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
    app_weather.shadowRoot.querySelector("#ans").innerHTML = JSON.stringify(resp.results.message.weather);
}

//mandatory
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-weather", `${APP_CONSTANTS.APP_PATH}/components/app-weather/app-weather.html`, app_weather);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_weather = { trueWebComponentMode, register, getWeather }