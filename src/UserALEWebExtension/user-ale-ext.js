/*
 eslint-disable
 */

// inherent dependency on globals.js, loaded by the webext

// browser is defined in firefox, but not in chrome. In chrome, they use
// the 'chrome' global instead. Let's map it to browser so we don't have
// to have if-conditions all over the place.
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
    userAleHost = item.userAleHost;
    userAleScript = item.userAleScript;
    
    injectScript();
}
        
function onError(error) {
    console.log(error);
}

function injectScript() {
    var userAleTag = document.createElement("script");
    userAleTag.type = "text/javascript";
    userAleTag.setAttribute("id", "userale-plugin");
    userAleTag.setAttribute("data-url", userAleHost);
    userAleTag.setAttribute("data-autostart", true);
    userAleTag.src = browser.extension.getURL(userAleScript);
    
    console.log("Injecting UserALE script into current page! " + userAleHost + " " + userAleScript);
    
    document.head.appendChild(userAleTag);
    document.body.innerHTML += "<br/><br/>SUCCESS! UserALE has been injected onto the page!";
}


/*
 eslint-enable
 */