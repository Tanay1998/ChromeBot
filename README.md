# ChromeBot
Slash commands built for Chrome! It's the chrome powerup you deserve.

Type `/ <command> <keyword>` to get started! 

** Quick Usage:** 
`/ e github` extracts all github tabs to a new page

`/ s` brings all tabs to your current window

`/ b youtube 120` bans youtube for 120 minutes

`/ m featherx` merges all featherx tabs to the right of your window

`/ c reddit` closes all reddit tabs

`/ a gmail` switches to gmail tab

Detailed instructions below

More coming soon! 

## Installation Instructions
Let's see if you can do this under 30 seconds. 
* Download the repo and unzip it. (or clone if you'd like)
* Go to `chrome://extensions`
* Turn on 'Developer Mode' on the top right corner.
* Click 'Load Unpacked' and select the folder you just downloaded. 
**Voila!**


## Usage Instructions 
**Note:** `<keyword>` searches for matches with the tab title. It can also be one of the two groups `allsocialmedia` and `allentertainment`. 

### Ban: `(b)an <keyword> <optional: time>` 
Will ban all websites that have the keyword for one hour.

**Example:** `/ ban allsocialmedia` will restrict access to social media sites.  
**Example:** `/ ban allsocialmedia 120` will restrict access to social media sites for 120 minutes.  

### Close: `(c)lose <keyword>` 
Will move all matching tabs together in their current window. 

**Example:** `/ close trump` will close all tabs with 'trump' in their title.

### Squeeze: `(s)queeze <keyword>` 
Will get all tabs together in their current window. 

**Example:** `/ squeeze` will bring everything to one window.

### Extract: `(e)xtract <keyword>` 
Like merge, but will move all matching tabs to a new window.

**Example:** `/ extract featherx` will move all tabs with 'featherx' to another window.

### Merge: `(m)erge <keyword>` 
Will move all matching tabs together in their current window. 

**Example:** `/ merge D2C` will move all tabs with D2C towards the right of the current window. 

### Activate: `(a)ctivate <keyword>` 
Will focus on the tab searched for among all your windows.

**Example:** `/ activate spc` will open the first matching tab.

### Find: `(f)ind <keyword>` 
It counts the number of tabs you have with the keyword in the title.

**Example:** `/ find slackbot` will find count all tabs with 'slackbot'.
