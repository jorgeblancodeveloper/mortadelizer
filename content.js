
//document.addEventListener('DOMContentLoaded', function() {
   console.log("arranco");
var actual;
    if (localStorage.getItem("css")) {
       var actual=localStorage.getItem("css")+"?"+Math.floor((Math.random() * 100) + 1);
       changeCSS(actual,0)
    }  else {
      actual="";
    }
//})

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    console.log(request.accion);
 if (request.accion=="pega") {
            changeCSS(request.texto, 0);
            localStorage.setItem("css", request.texto);
            sendResponse({"farewell": "nasty"});
        } 
   if (request.accion=="copiacss") {       
          sendResponse({"farewell": document.styleSheets[0].href});
        }

 if (request.accion=="dimecss") {       
          sendResponse({"farewell": actual});
          console.log(actual);
        }
if (request.accion=="remove") {       
           localStorage.removeItem("css");
          location.reload();
}
   }
);

function changeCSS(cssFile, cssLinkIndex) {
    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);
    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}