document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem("buffer")) {
        $("#buffer").html(localStorage.getItem("buffer"))
    }

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "accion": "dimecss"
        }, function(response) {
            if (response.farewell != "") {
                $("#actual p").html(response.farewell)
                    /*   chrome.browserAction.setIcon({
                           path: "icon_red.png"
                       });*/
            }
        });
    });

    var url;
    $("#copy").on("click", function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                "accion": "copiacss"
            }, function(response) {
                localStorage.setItem("buffer", response.farewell);
                $("#buffer").html(localStorage.getItem("buffer"));
            });
        });
    });
    $("#clear").on("click", function() {
        localStorage.removeItem("buffer");
        $("#buffer").html("");
    });

    $("#remove").on("click", function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                "accion": "remove"
            }, function(response) {
                window.close();
            });
        });
    });

    $("#fill").on("click", function() {
        if ($("#buffer").html() == "") {
            url = $("#name").val();
        } else {
            url = $("#buffer").html()
        }

        localStorage.removeItem("buffer");
        $("#buffer").html("");
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                "accion": "pega",
                "texto": url
            }, function(response) {
                window.close();
            });
        });
    });
});
