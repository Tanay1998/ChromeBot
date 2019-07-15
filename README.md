# ChromeBot
Slash commands built for Chrome! It's the chrome powerup you deserve.

Type `/ <command> <keyword>` to get started! 

**Example Usage:** `/ extract github` will moves all your github tags to a separate window. 

More coming soon! 

## Installation Instructions
Let's see if you can do this under 30 seconds. 
* Download the repo and unzip it. (or clone if you'd like)
* Go to `chrome://extensions`
* Turn on 'Developer Mode' on the top right corner.
* Click 'Load Unpacked' and select the folder you just downloaded. 
**Voila!**


## Usage Instructions 
**Note:** `<keyword>` searches for matches with the tab title. 

### Merge: `merge <keyword>` 
Will move all matching tabs together in their current window. 

**Example:** `/ merge D2C` will move all tabs with D2C towards the right of the current window. 

### Close: `close <keyword>` 
Will move all matching tabs together in their current window. 

**Example:** `/ close trump` will close all tabs with 'trump' in their title.

### Extract: `extract <keyword>` 
Like merge, but will move all matching tabs to a new window.

**Example:** `/ extract featherx` will move all tabs with 'featherx' to another window.

### Activate: `activate <keyword>` 
Will focus on the tab searched for among all your windows.

**Example:** `/ activate spc` will open the first matching tab.

### Find: `find <keyword>` 
It counts the number of tabs you have with the keyword in the title.

**Example:** `/ find slackbot` will find count all tabs with 'slackbot'.
