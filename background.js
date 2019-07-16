paramCommands = {
    merge: merge, m: merge,
    close: close, c: close,
    ban: ban, b: ban,
    extract: extract, e: extract,
    activate: activate, a: activate,
    find: find, f: find,
}

soloCommands = {
    condense: condense, squeeze: condense, s: condense,
}


chrome.omnibox.onInputEntered.addListener(
    function(text) {
        tokens = text.toLowerCase().split(" ")
        if (tokens.length == 0) {
            return;
        } 

        cmd = tokens[0]

        // standalone commands 
        if (tokens.length == 1) {
            for (c in soloCommands) {
                if (c == cmd) {
                    soloCommands[c]();
                    break;
                }
            }
        }

        // regex matches
        if (banWithTimeQuery(text)) {
            return;
        }

        // commands with only parameters
        query = tokens.slice(1).join(" ")
        for (c in paramCommands) {
            if (c == cmd) {
                paramCommands[c](query)
            }
        }
});

function banWithTimeQuery(text) {
    var minRegex = new RegExp('ban (.*) (\\d+)\\s?m?', 'i');
    var hourRegex = new RegExp('ban (.*) (\\d+)\\s?h', 'i');

    m = text.match(hourRegex);
    if (m) {
        ban(m[1], 60 * parseInt(m[2]))
        return true;
    }

    m = text.match(minRegex);
    if (m) {
        ban(m[1], parseInt(m[2]))
        return true;
    }

    return false;
}


/* 

    RETRIEVE TABS FROM QUERY

*/


groupMaps = {
    'allsocialmedia': ['facebook.com', 'instagram.com', 'twitter.com', 'messenger.com',
                    'reddit.com', 'pintrest.com', 'youtube.com', 'youtu.be', 'whatsapp.com'],
    'allentertainment': ['youtube.com', 'netflix.com', 'vimeo.com', 'dailymotion.com',
                      'hulu.com', 'twitch.com']
}

function getTabIdsGroup(query) {
    if (query in groupMaps) {
        return new Promise(function(resolve, reject) {
            queryInfo = { }
            chrome.tabs.query(queryInfo, function(tabs) {
                var regexes = groupMaps[query].map(q => new RegExp(q, 'i'));
                var tabIds = [];
                tabs.forEach(function(tab) {
                    var match = false;
                    regexes.forEach(function (regex) {
                        if (regex.test(tab.title)) {
                            match = true;
                        } else if (regex.test(tab.url)) {
                            match = true;
                        }
                    })
                    if (match) {
                        tabIds.push(tab.id);
                    }
                });
                resolve(tabIds);
            });
        });
    } else {
        return getTabIds(query);
    }
    
}

function getTabIds(query) {
    console.log("Get Tab Ids: " + query);
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

/* 

    EXECUTABLE COMMANDS

*/

function activate(query) {
    getTabIdsGroup(query).then(function (tabIds) {
        if (tabIds.length) {
            chrome.tabs.update(tabIds[0], { active: true });
            chrome.tabs.get(tabIds[0], function (tab) {
                chrome.windows.update(tab.windowId, { focused: true })
            });
        }
    });
}

function find(query) {
    getTabIdsGroup(query).then(function (tabIds) {
        alert ("Found " + tabIds.length + " tabs.")
    })
}


function extract(query) {    
    getTabIdsGroup(query).then(function (tabIds) {
        if (!tabIds.length) {
            return tabIds;
        }

        // Moves them to a new window
        chrome.windows.create({ tabId: tabIds[0] }, function (window) {
            moveProperties = { windowId: window.id, index: -1 }
            chrome.tabs.move(tabIds.slice(1), moveProperties);
        });
    });
}


function merge(query) {
    getTabIdsGroup(query).then(function (tabIds) {
        // Moves them to the end of the window
        moveProperties = { index: -1 }
        chrome.tabs.move(tabIds, moveProperties)
    });
}

function ban(query, minutes=60) {
    close(query)
    chrome.storage.sync.get(null, function(data) {
        data.banUntil[query] = Date.now() + minutes * 60 * 1000;
        chrome.storage.sync.set({ banUntil: data.banUntil })
        console.log(data.banUntil);
    })
}

function close(query) {
    getTabIdsGroup(query).then(function (tabIds) {
        chrome.tabs.remove(tabIds, function() {
            alert ("Closed " + tabIds.length + " tabs.")
        });
    });
}

function condense() {
    chrome.tabs.query(queryInfo, function(tabs) {
        windowId = tabs[0].windowId;
        tabIds = tabs.map(tab => tab.id);
        moveProperties = { windowId: windowId, index: -1 }
        chrome.tabs.move(tabIds.slice(1), moveProperties);
    });
}


/* 

    LISTENERS FOR BANNED SITES

*/


chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ banUntil: {} });
});


redirUrl = "https://www.rickrolled.com/get-rolled"


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Means we have a new website loading 
    if ("url" in changeInfo) {
        var url = changeInfo.url.toLowerCase();
        chrome.storage.sync.get(null, function(data) {
            console.log(data.banUntil)
            for (var token in data.banUntil) {
                if (url.includes(token)) {
                    // This token was banned at some point. Is it still banned? 
                    if (Date.now() < data.banUntil[token]) {
                        chrome.tabs.update(tabId, {url: redirUrl })
                    }
                }
            }
        });
    }
});



/* 

    SUGGESTIONS FOR AUTOCOMPLETE

*/


suggestionsList = [
    {content: "extract <keyword>", description: "Extract: Extracts tabs with the keyword in a current window"},
    {content: "close <keyword>", description: "Close: Closes all tabs with the keyword"},
    {content: "ban <keyword>", description: "Ban: Bans website for 1 hour"},
    {content: "condense", description: "Condense: Gets all tabs to the same window"},
    {content: "activate <keyword>", description: "Activate: Brings tab with keyword into focus"},
    {content: "merge <keyword>", description: "Merge: Brings tabs with the keyword together in their current window"},
    {content: "find <keyword>", description: "Find: Finds number of tabs with the keyword"},
]

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    cmd = text.split(" ")
    suggestions = [];
    suggestionsList.forEach(function(sug) {
        if (cmd.length == 0 || sug.content.includes(cmd[0])) {
            suggestions.push(sug);
        }
    })
    suggest(suggestions);
});
