/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const gotoadd = async () => {
    document.getElementsByTagName('app-detail')[0].style.display = "none";
    document.getElementsByTagName('app-addbook')[0].style.display = "block";
}

const gotorem = async () => {
    document.getElementsByTagName('app-detail')[0].style.display = "none";
    document.getElementsByTagName('app-delbook')[0].style.display = "block";
}

async function elementRendered(element) {
    console.log(element);
    let resp = await apiman.rest(APP_CONSTANTS.API_DETAIL, "POST", {}, false, true);
    var bookDetails = element.shadowRoot.querySelector("#book-details");
    if (resp) {
        const data = resp.message
        for (var i = 0; i < data.length; i++) {

            var row = document.createElement('tr');
            var name = document.createElement('td');
            var id = document.createElement('td');
            var isbn = document.createElement('td');
            var copies = document.createElement('td');
            var Category = document.createElement('td');
            // var action = document.createElement('td');

            name.textContent = data[i].Id;
            id.textContent = data[i].Name;
            isbn.textContent = data[i].ISBN;
            copies.textContent = data[i].Count;
            Category.textContent = data[i].Category;
            // action.innerHTML = (`<button id="borBut-${data[i].Id}" onClick="borBook('${data[i].Id}')">Borrow</button>`
            //     , `<button id="retBut-${data[i].Id}" onClick="retBook('${data[i].Id}')">Return</button>`)

            row.appendChild(name);
            row.appendChild(id);
            row.appendChild(isbn);
            row.appendChild(copies);
            row.appendChild(Category);
            // row.appendChild(action);
            bookDetails.appendChild(row);
        }
    }
    else
        console.log("no resp");
}
function register() {
    // convert this all into a WebComponent so we can use it
    //console.log("hiiii");
    monkshu_component.register("app-detail", `${APP_CONSTANTS.APP_PATH}/components/app-detail/app-detail.html`, app_detail);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_detail = { trueWebComponentMode, register, gotoadd, gotorem, elementRendered }