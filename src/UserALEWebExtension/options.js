/* eslint-env node */

if (chrome) {
    browser = chrome;
}

// creates a Future for retrieval of the named keys
// the value specified is the default value if one doesn't exist in the storage
let store = browser.storage.local.get({
    userAleHost: userAleHost,
    userAleScript: userAleScript
}, storeCallback);
        
function storeCallback(item) {
    console.log(item);
    document.getElementById("host").value = item.userAleHost;
    document.getElementById("clientScript").value = item.userAleScript;
}
        
function onError(error) {
    console.log(error);
}

function saveOptions(e) {
    //e.preventDefault();
    browser.storage.local.set({
        userAleHost: document.getElementById("host").value,
        userAleScript: document.getElementById("clientScript").value,
    });
}

document.addEventListener("submit", function() {
    saveOptions();
});