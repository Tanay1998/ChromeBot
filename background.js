chrome.omnibox.onInputEntered.addListener(
    function(text) {
        tokens = text.toLowerCase().split(" ")
        if (tokens.length != 2) {
            alert ("Sorry I don't understand.")
        }
        switch (tokens[0]) {
            case "merge": 
            case "m":
                merge(tokens[1])
                break;
            case "close":
            case "c": 
                close(tokens[1])
                break;
            case "extract":
            case "e": 
                extract(tokens[1])
                break;
            case "find":
            case "f": 
                find(tokens[1])
                break;
            case "activate":
            case "a": 
                activate(tokens[1])
                break;
            default:
                console.log("wtf is this");
    }
});

function getTabIds(query) {
    return new Promise(function(resolve, reject) {
        queryInfo = { }
        chrome.tabs.query(queryInfo, function(tabs) {
            var regex = new RegExp(query, 'i');
            var tabIds = [];
            tabs.forEach(function(tab) {
                if (regex.test(tab.title)) {
                    tabIds.push(tab.id);
                } else if (regex.test(tab.url)) {
                    tabIds.push(tab.id);
                }
            });
            resolve(tabIds);
        });
    });
}

function activate(query) {
    // alert("Activating tab for " + query);
    getTabIds(query).then(function (tabIds) {
        if (tabIds.length) {
            chrome.tabs.update(tabIds[0], { active: true });
            chrome.tabs.get(tabIds[0], function (tab) {
                chrome.windows.update(tab.windowId, { focused: true })
            });
        }
    });
}

function find(query) {
    // alert("Finding tabs for " + query);
    getTabIds(query).then(function (tabIds) {
        alert ("Found " + tabIds.length + " tabs.")
    })
}


function extract(query) {
    // alert("Extracting  tabs with " + query);
    
    getTabIds(query).then(function (tabIds) {
        if (!tabIds.length) {
            return tabIds;
        }

        // Moves them to a new window
        chrome.windows.create({ tabId: tabIds[0] }, function (window) {
            moveProperties = { windowId: window.id, index: -1 }
            chrome.tabs.move(tabIds.slice(1), moveProperties, function() {
                // alert ("Extracted " + tabIds.length + " tabs.")
            });
        });
    });
}


function merge(query) {
    // alert("Merging tabs with " + query);

    getTabIds(query).then(function (tabIds) {
        // Moves them to the end of the window
        moveProperties = { index: -1 }
        chrome.tabs.move(tabIds, moveProperties, function() {
            // alert ("Merged " + tabIds.length + " tabs.")
        })
    });
}

function close(query) {
    // alert("Closing tabs with " + query);

    getTabIds(query).then(function (tabIds) {
        chrome.tabs.remove(tabIds, function() {
            alert ("Closed " + tabIds.length + " tabs.")
        });
    });
}

suggestions_list = [
    {content: "merge <keyword>", description: "Merge: Brings tabs with the keyword together in their current window"},
    {content: "close <keyword>", description: "Close: Closes all tabs with the keyword"},
    {content: "activate <keyword>", description: "Activate: Brings tab with keyword into focus"},
    {content: "extract <keyword>", description: "Extract: Extracts tabs with the keyword in a current window"},
    {content: "find <keyword>", description: "Find: Finds number of tabs with the keyword"},
]

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    cmd = text.split(" ")
    suggestions = [];
    suggestions_list.forEach(function(sug) {
        if (cmd.length == 0 || sug.content.includes(cmd[0])) {
            suggestions.push(sug);
        }
    })
    suggest(suggestions);
});
