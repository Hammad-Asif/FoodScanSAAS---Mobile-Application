# Getting Started

## Step 1: Setup Application

Run Command
```bash
npm install
```
#### For Android
Change Kotlin gradle version of React Native Webview in node_modules/react-native-webview/android/gradle.properties

```bash
+ ReactNativeWebView_kotlinVersion=1.7.20
```
Go to android and clean gradle
```bash
cd android
./gradlew clean
```
### Start Application in Android
```bash
// In root folder
npx react-native run-android
```