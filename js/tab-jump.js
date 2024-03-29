const defaultTabBackgroundColor = "#45a";
const defaultTabFontColor = "white";

chrome.tabs.query({currentWindow: true}, function(tabs) {
    var tabsDiv = document.getElementById("tabs");
    tabs.forEach(function(tab) {
        tabsDiv.appendChild(createTabJumpButton(tab));
    })
});

function createTabJumpButton(tab) {
    var element = document.createElement("input");
    element.type = "button";
    element.value = tab.title;
    element.title = tab.title;
    element.className = "tab-jump-button";

    if(tab.groupId && tab.groupId > 0) {
        chrome.tabGroups.get(tab.groupId).then(function(result) {
            element.style.backgroundColor = result.color;
            element.style.color = decideFontColor(result.color);
        });
    } else {
        element.style.backgroundColor = defaultTabBackgroundColor;
        element.style.color = defaultTabFontColor;
    }

    element.onclick = function() {
        chrome.tabs.update(tab.id, {active: true});
    };
    return element;
}

function decideFontColor(color) {
    var lightTabColors = ["yellow", "cyan"];
    if(lightTabColors.includes(color)) {
        return "black";
    }
    return "white";
}
