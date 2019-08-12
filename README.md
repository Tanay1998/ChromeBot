# ChromeBot
Slash commands built for Chrome! It's the chrome powerup you deserve.

Get this on the Chrome Extensions Web Store: https://chrome.google.com/webstore/detail/ejdaeiahdnabjhceoobekpekohcileep/publish-accepted

Have a crazy new feature idea? Submit a feature request or make a PR! 

Type `/ <command> <keyword>` to get started! 

## Quick Usage: 
`/ extract github` extracts all github tabs to a new window. Shorthand: `/ e github`

`/ squeeze` brings all tabs to your current window. Shorthand: `/ s`

`/ ban youtube 120` bans youtube for 120 minutes. Shorthand: `/ b youtube`

`/ merge featherx` merges all featherx tabs to the right of your window. Shorthand: `/ m featherx`

`/ close reddit` closes all reddit tabs. Shorthand: `/ c reddit`

`/ activate gmail` switches to gmail tab. Shorthand: `/ a gmail`

Detailed instructions below

More coming soon! 


## Usage Instructions 
**Note:** `<keyword>` searches for matches with the tab title. It can also be a group keyword (eg. `allsocialmedia`, `allentertainment`) 

### Ban: `(b)an <keyword> <optional: time>` 
Will ban all websites that have the keyword for one hour.

**Example:** `/ ban allsocialmedia` will restrict access to social media sites.  
**Example:** `/ ban allsocialmedia 120` will restrict access to social media sites for 120 minutes.  
**Example:** `/ ban allentertainment 5h` will restrict access to entertainment sites for 5 hours.  

### Close: `(c)lose <keyword>` 
Will close all matching tabs

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
