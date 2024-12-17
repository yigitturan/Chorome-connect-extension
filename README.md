# IMPORTANT NOTES
The chat branch is the updated branch, switch from main to chat for the most updated app. We use firebase for hosting and for our collections.

One small bug with the camera button, must click open camera, then click capture photo, and click open camera again before you can send the photo.

App can also run locally in browser too.

Extension can be made bigger or smaller by drapping the side panel in the browser.


# Angular Chrome Extension Scaffold

This project is only a scaffold, use the CLI tool to generate a new project.

See: https://github.com/larscom/ng-chrome-extension


How to install
npm install -g @larscom/ng-chrome-extension
Start creating a new project
ng-chrome new-- already did 


npm install @types/chrome --save-dev (necessary)

# Install TypeScript for compiling .ts files
npm install typescript --save-dev

# Install Type definitions for Chrome Extensions API
npm install @types/chrome --save-dev

# Install Angular core libraries (if using Angular for the popup/side panel)
npm install @angular/core @angular/router @angular/cli --save-dev

# Install ESLint for linting and Prettier for code formatting (optional but recommended)
npm install eslint prettier --save-dev

# Install Webpack and related packages for bundling (optional for larger projects)
npm install webpack webpack-cli webpack-dev-server --save-dev


# Chrome Extension Explanation
How to use/develop
change your directory to your newly created project (cd into chorome-connect-extension)
run npm run start

## IMPORTANT SUB-STEP
You must change the serviceworker.js file in the dist folder to match the one in the extra file for project to work. Just copy and paste the serviceworker.js file

Then go to: chrome://extensions in the browser and enable 'developer mode' in the top right.

press Load unpacked in the top left at chrome://extensions and choose the folder angular/dist

click the reload button next to the new angular extension to make sure it is updated.

The extension name will be "Angular Chrome Extension"

The project is automatically being watched, any changes to the files will recompile the project.

NOTE: changes to the content page and service worker scripts requires you to reload the extension in chrome://extensions


