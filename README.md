# Angular Chrome Extension Scaffold

This project is only a scaffold, use the CLI tool to generate a new project.

See: https://github.com/larscom/ng-chrome-extension


How to install
npm install -g @larscom/ng-chrome-extension
Start creating a new project
ng-chrome new-- already did 

How to use/develop
change directory to your newly created project
run npm run start
goto: chrome://extensions in the browser and enable 'developer mode'
press Load unpacked and target the folder angular/dist
The project is automatically being watched, any changes to the files will recompile the project.

NOTE: changes to the content page and service worker scripts requires you to reload the extension in chrome://extensions


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


SO i made sidepanel , ( sidepanel was not implemented in larscom)
i used last version of google chrome extension way ,s
so it was different and better than first template

we can just focus , sidepanel component , 
but also, popup component makes small extension  window
          tab component makes new tab 
        content page and service work is about extension process with browser

        manifest json is like brain of project control everything 
        angular json also

        sidepanel js and side panel html important to control side panel 

dist file is like solved pack , to using files in chorome extensions developer part,
when we run , we load files to dist file and ts is converting js and manifest work and etc.. so it is ready to use in dist file

We Will develop chat app in side panel