# Project Initialization

## 1 Create a Blank Project

Install Ionic and Cordova CLI if you haven't installed them.

```sh
npm install -g ionic cordova
```

Then create a blank Ionic app. Answer "yes" to the first quesiton (targeting natvie Android and iOS) and "No" to the second (use Ionic Pro).

```sh
ionic start TeYiXing blank
```

Creat an empty GitHub repository and commit/push the initial project.

## 2 Create `.gitignore` and readme

Copy the sample `.gitignore` to the project root folder and add the following lines` to ignore generated ionic files.

```sh
.sourcemaps/
.sass-cache/
coverage/
hooks/
platforms/
plugins/
www/
```

Copy the sample `README.md` and edit it for the current project.

## 3 Lint and Prettier

Then install and configure "TSLint" and "Prettier" as required by TypeScript coding standard.

## 4 Add the Icon and the Splash Screen

Copy your `icon.png` (size of 1024 _ 1024) and `splash.png` (size of 3724 _ 3724) files to `/resources` folder and overwrite the two files with the same names and same sizes. Run `ionic cordova resources` to update platform resources.

## 5 Fix Form Input Scroll Issues

Set options for `IonicModule` to fix form input scrolling issues.

```ts
IonicModule.forRoot(MyAppComponent, {
  // https://stackoverflow.com/questions/41161705/ionic-2-form-goes-up-when-keyboard-shows
  // the following three lines fix form input scroll issues
  scrollPadding: false,
  scrollAssist: true,
  autoFocusAssist: false,
}),
```

## 6 Deploy

### 6.1 Deploy to iOS

The [Cordova iOS Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/) has detail information for iOS deployment.

To run the app in an iPhone, you need to install iOS deployment tool using `npm install -g ios-deploy`. You may have an error: `stderr: xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance`. In this case, run `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer` first to fix it. The command sets the active developer directory.

To run iOS simulator, use xcode IDE to open the `/platforms/ios/project-name.xcodeproj` file and set your Apple developer account to code sign your app. Then you should be able to run the iOS simulator using `ionic cordova emulate ios --livereload`.

### 6.2 Deploy to Android

The [Cordova Android Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) has detail information for Android deployment.

You should install JDK 8. You may need to install gradle. On 2018/04/05, Ionic has some errors with Java JDK 10. Additionally, the Android plugin for Gradle version 3.1.0 requires Gradle 4.4 or above. Therefore, add `export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL="https\\://services.gradle.org/distributions/gradle-4.6-all.zip"` to `.bash_profile` in Mac OS.

Then run `ionic cordova build android` to build the android project. Then open `/platforms/andorid` in Android Studio. In `Tools/AVD Manager`, create a new virtual device that uses a cordova-compatible API level, for example, 25. Then you should be able to run android emulator using `ionic cordova emulate android`.

There might be a network error for a specific IP when the app is deployed to an Android phone. Change the configuration to `<allow-navigation href="*" />` in `/config.xml`.

To deploy a release version, follow these steps:

- Create a release build: `ionic cordova build android --prod --release`
- Generate a release key: `keytool -genkey -alias tyx-20180406 -keyalg RSA -keystore tyx-app-key.jks -dname "CN=First Last, OU=IT, O=Te Hang, L=SZ, S=GZ, C=CN" -keysize 2048 -validity 10000 -storepass password -keypass password`. Then copy the `tyx-app-key.jks` to a safe place.
- Sign the APK: `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore tyx-app-key.jks app-release-unsigned.apk tyx-20180406 -storepass password`.
- Optimize the APK: `~/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 app-release-unsigned.apk TeYiXing.apk`.
- Verify the signed APK: `~/Library/Android/sdk/build-tools/27.0.3/apksigner verify TeYiXing.apk`.
- Push to Android phone via USB: `~/Library/Android/sdk/platform-tools/adb install TeYiXing.apk`.
