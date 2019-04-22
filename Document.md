# WCTTigard Project Structure

## Before we start

We will use `expo` instead of standard `react-native` to initialize and structure the project.
Before finalizing the app, please remember to `refactor` the whole structure. Make sure that:

1. There are no redundant files and libraries.

1. There are redundant calls and HTTP/RESTful APIs requests, responses.

## The Structure

### General Structure

1. We will use AppContainer as a way to link everything in this app since that's one of the crucial elements when using Navigation.
1. Rules for adding new file:
  I. Do not add to root folder unless the file is system related.
  II. Any `.js` or other coding file should be placed inside `src` folder.
    * Name of `.js` file should follow camel-case rule with the first character also capitalized.
    * For new screen, please create a folder with the same name as the screen and put it inside the `Screen` folder. For instance, `Home.js` should be placed inside a folder named `Home`. The path to the file should be `src/Screens/Home/Home.js`.
    * Redux actions and reducers should be placed inside `Redux` folder. The `Redux` folder should also be indexed via `types.js`.
    * Any other common component or styling that are reusable file should be placed inside `common`.

### App Entry

1. `~/App.js` is the initial route as specified in `~/node_modules/expo/AppEntry.js`. We can change the default loading screen for the app inside the same `.js` file.
1. The default screen after the loading screen can be set inside `~/AppContainer.js` via `initialRouteName` variable.
1. For the sake of debugging, it is recommended to set the variable to whatever screen you are working on.
1. However, in order for the function to work, make sure to import the screen and add it to the `MyDrawerNavigator` as done with many screens already.

### Styling

1. We many `Native Base` styling standards, which are defined inside the files in `~/native-base-theme`, and components for our code.
1. However, if you prefer for custom styling, the file is in `~/src/common/CustomStyle.js`.