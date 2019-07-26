# Coffeegram Mobile

The mobile app for Coffeegram, a simple portfolio project to show the use of React-Native and its libraries.

Tools used:
- Expo
- React-Navigation
- Expo Image Picker
- Axios
- Socket.io

The app is ready to consume data from the "Coffeegram Server" repository. Just insert your host address into env.js file.

## Project setup
```
$ npm install -g expo-cli
```
Installs [Expo Client](https://facebook.github.io/react-native/docs/getting-started) Globally. Feel free to eject the app in case you don't want to use Expo.

```
$ yarn install
```
Downloads dependencies.

```
$ npm start
```
OR
```
$ expo start
```
Runs the app in the development mode.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the Expo Client in the development mode, in the Browser. From there you can deploy to your iOS or Android device.

### `npm android`

Builds the app for Android devices.

### `npm ios`

Builds the app for iOS devices.

### `npm eject`

Ejects the app from the Expo Client. Be careful as this can't be undone. Use this command only in case you need to add native code to the add. This will require further configuration.