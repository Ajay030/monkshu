/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const loging = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_SIGNUP, "POST", {}, false, true);
    console.log(resp);
    if (!resp || !resp.result) router.reload();
    else alert("SUCCESSFULL")
    // app_message.shadowRoot.querySelector("#message").value = resp.results.message;
    setTimeout(() => {
        document.getElementsByTagName('app-signup')[0].style.display = "none";
        document.getElementsByTagName('app-login')[0].style.display = "block";
        }, 3000);
}
function register() {
    // convert this all into a WebComponent so we can use it
    //console.log("hiiii");
    monkshu_component.register("app-signup", `${APP_CONSTANTS.APP_PATH}/components/app-signup/app-signup.html`, app_signup);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_signup = { trueWebComponentMode, register,loging }