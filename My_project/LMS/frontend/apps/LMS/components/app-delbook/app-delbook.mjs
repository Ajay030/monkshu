/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";


function register() {
    // convert this all into a WebComponent so we can use it
    //console.log("hiiii");
    monkshu_component.register("app-delbook", `${APP_CONSTANTS.APP_PATH}/components/app-delbook/app-delbook.html`, app_delbook);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_delbook = { trueWebComponentMode, register}