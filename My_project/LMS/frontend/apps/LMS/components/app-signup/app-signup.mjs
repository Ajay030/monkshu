/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const signed = async () => {
    let jsonReq = {}
    jsonReq.First_name = app_signup.shadowRoot.querySelector("#F_name").value;
    jsonReq.Last_name = app_signup.shadowRoot.querySelector("#L_name").value;
    jsonReq.Email = app_signup.shadowRoot.querySelector("#Email").value;
    jsonReq.Password = app_signup.shadowRoot.querySelector("#Password").value;
    jsonReq.Join_date = app_signup.shadowRoot.querySelector("#Join_date").value;

    let resp = await apiman.rest(APP_CONSTANTS.API_SIGNUP, "POST", jsonReq , false, true);
    console.log(resp);
    if (!resp || !resp.result) 
    alert("something went wrong");
    else 
    {
        alert("SUCCESSFULL")
         document.getElementsByTagName('app-signup')[0].style.display = "none";
         document.getElementsByTagName('app-login')[0].style.display = "block";
 
    }
}
const log = async() => {
    document.getElementsByTagName('app-signup')[0].style.display = "none";
    document.getElementsByTagName('app-login')[0].style.display = "block";
}
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-signup", `${APP_CONSTANTS.APP_PATH}/components/app-signup/app-signup.html`, app_signup);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_signup = { trueWebComponentMode,register,signed,log }