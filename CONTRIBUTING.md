# Contributing to Hermit-Tools/Thumbnail-Maker
👍🎉 First off, thanks for taking the time to contribute! 🎉👍

The following is a set of guidelines for contributing to Thumbnail-Maker. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Submitting a change
Please commit all the changes in the beta version of the tool only. Beta version of anything is located under *Source/* with the same rest of the location. Commiting to the direct next release is more beneficial than commiting to a far release.  
Please send a GitHub Pull Request with a clear list of what you've done. Please make sure all of your commits are atomic (one feature per commit).

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:
```
$ git commit -m "A brief summary of the commit
> 
> A paragraph describing what changed and its impact."
```
We would love if you add emojis to your commit messages. Emojis can make commit messages very much friendly. The following is a table of emojis you can add with your commit messages. Feel free to add more rows to the table.

Commit is about | Emoji to represent | Example
--- | --- | ---
Added something new | 🆕 | 🆕Added download button
Fixed/corrected something | 🔧 | 🔧Fixed #9
Changed something | ✏ | ✏Changed background color from red to blue
Updated something | 🔼 | 🔼Updated downloadImage()
Minor changes | 🦠 | 🦠Minor changes `List the changes in description`
Created a new file | ➕ | ➕Created file service-worker.js

## Coding conventions
Start reading our code and you'll get the hang of it. We optimize for readability:

- We indent using four spaces
- We ALWAYS put spaces after list items and method parameters ([1, 2, 3], not [1,2,3]), around operators (x += 1, not x+=1), and around hash arrows.
- This is open source software. Consider the people who will read your code, and make it look nice for them. It's sort of like driving a car: Perhaps you love doing donuts when you're alone, but with passengers the goal is to make the ride as smooth as possible.
