/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const gotoadd = async () => {
    const cooken = document.cookie.split('=');
    console.log(cooken[1]);
    let jsonReq = {};
    jsonReq.TOKEN = cooken[1];
    let resp = await apiman.rest(APP_CONSTANTS.API_AUTH, "POST", jsonReq, false, true);
    console.log("hii");
    console.log(resp.result);
    if (resp.result) {
        document.getElementsByTagName('app-detail')[0].style.display = "none";
        document.getElementsByTagName('app-addbook')[0].style.display = "block";
    }
    else {
        alert("this page only for admin")
    }
}

const gotorem = async () => {
    const cooken = document.cookie.split('=');
    console.log(cooken[1]);
    let jsonReq = {};
    jsonReq.TOKEN = cooken[1];
    let resp = await apiman.rest(APP_CONSTANTS.API_AUTH, "POST", jsonReq, false, true);
    console.log("hii");
    console.log(resp.result);
    if (resp.result) {
        document.getElementsByTagName('app-detail')[0].style.display = "none";
        document.getElementsByTagName('app-delbook')[0].style.display = "block";
    }
    else {
        alert("this page only for admin")
    }
}

async function elementRendered(element) {
    console.log(element);
    let resp = await apiman.rest(APP_CONSTANTS.API_DETAIL, "POST", {}, false, true);
   // fun(resp.message[0].ID);
   // let resp2 = await apiman.rest(APP_CONSTANTS.API_DETAIL, "POST", {}, false, true);
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
            var action = document.createElement('td');

            name.textContent = data[i].ID;
            id.textContent = data[i].Name;
            isbn.textContent = data[i].ISBN;
            copies.textContent = data[i].Count;
            Category.textContent = data[i].Category;
            console.log(await fun(data[i].ID))
            action.innerHTML =  (await fun(data[i].ID) === 0) 
              ?  `<button id="btn2" onclick='monkshu_env.components["app-detail"].borrow(${data[i].ID})'>Borrow</button>`
              : `<button id="btn" onclick='monkshu_env.components["app-detail"].vapis(${data[i].ID})'>Return</button>`;
            

            row.appendChild(name);
            row.appendChild(id);
            row.appendChild(isbn);
            row.appendChild(copies);
            row.appendChild(Category);
            row.appendChild(action);
            bookDetails.appendChild(row);
        }
    }
    else
        console.log("no resp");

    async function fun(id) {
        console.log("hiii", id);
        const cooken = document.cookie.split('=');
        let jsonReq = {}
        jsonReq.TOKEN = cooken[1];
        jsonReq.Book_id = id;
        let resp = await apiman.rest(APP_CONSTANTS.API_STATUS, "POST", jsonReq, false, true);
        // console.log(resp.message[0].Status)
        if( resp.message[0].Status === "Borrow")
        return 1 ;
        else
        return 0;
    }
}

const borrow = async (bookid) => {
    const cooken = document.cookie.split('=');
    console.log(cooken[1]);
    console.log(bookid);
    let jsonReq = {}
    jsonReq.type = "borrow"
    jsonReq.TOKEN = cooken[1];
    jsonReq.Date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    jsonReq.Book_id = bookid;

    let resp = await apiman.rest(APP_CONSTANTS.API_TRANSACTION, "POST", jsonReq, false, true);
    console.log(resp);
    if (!resp || !resp.result)
        alert("something went wrong");
    else {
        alert(resp.message)
        //  document.getElementsByTagName('app-addbook')[0].style.display = "none";
        //  document.getElementsByTagName('app-login')[0].style.display = "block";

    }
}
const vapis  = async (bookid) => {
    const cooken = document.cookie.split('=');
    console.log(cooken[1]);
    console.log(bookid);
    let jsonReq = {}
    jsonReq.type = "return"
    jsonReq.TOKEN = cooken[1];
    jsonReq.Date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    jsonReq.Book_id = bookid;

    let resp = await apiman.rest(APP_CONSTANTS.API_TRANSACTION, "POST", jsonReq, false, true);
    console.log(resp);
    if (!resp || !resp.result)
        alert("something went wrong");
    else {
        alert(resp.message)
        //  document.getElementsByTagName('app-addbook')[0].style.display = "none";
        //  document.getElementsByTagName('app-login')[0].style.display = "block";

    }
}
function register() {
    // convert this all into a WebComponent so we can use it
    //console.log("hiiii");
    monkshu_component.register("app-detail", `${APP_CONSTANTS.APP_PATH}/components/app-detail/app-detail.html`, app_detail);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_detail = { trueWebComponentMode, register, gotoadd, gotorem, elementRendered, borrow ,vapis}