# Green App

> A native application built with NativeScript-Vue

## Prerequisites

* Node >= 8.15.0
* [NativeScript](https://docs.nativescript.org/angular/start/quick-setup)
* Yarn

## Usage

```bash
# Install dependencies
yarn install

# Build for dev
yarn start

# Build for production
yarn build

# Build, watch for changes and debug the application
yarn debug
```

### On a real Android device

Make sure your phone has dev options activated & adb debug mode on.

Your device should appears with `yarn ls` (or `tns device`) :

```bash
Connected devices & emulators
Searching for devices...
┌───┬─────────────┬──────────┬───────────────────┬──────────┬───────────┐
│ # │ Device Name │ Platform │ Device Identifier │ Type     │ Status    │
│ 1 │ avd_25      │ Android  │ emulator-5554     │ Emulator │ Connected │
│ 2 │ Device name │ Android  │ DEVICE_ID_123     │ Device   │ Connected │
└───┴─────────────┴──────────┴───────────────────┴──────────┴───────────┘
```

Then you can `tns run android --bundle --device DEVICE_ID_123`

You should see your app running on device and this in console : `Successfully synced application green.nsvue.app on device DEVICE_ID_123`

## Installing on macOS

### XCode

Install XCode 9 (macOS 10.13) or 10 (macOS 10.14) from Mac AppStore or Apple's Developer site.

### Homebrew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Node, Yarn

* Install NVM :

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

* Install Node 11.x using NVM :

```bash
nvm install 11.10
nvm alias default 11.10
```

* Install Yarn

```bash
brew install yarn
```

### xcodeproj, cocoapods, six

* xcodeproj :

```bash
sudo gem install -n /usr/local/bin xcodeproj
```

* cocoapods :

```bash
sudo gem install -n /usr/local/bin cocoapods
pod setup
```

* six :

```bash
pip install six
```

### Yarn dependencies

```bash
yarn install
```

## Building for iOS

* Building for production :

```bash
yarn build:ios
```

* Starting the app in iOS simulator or iOS device :

```bash
yarn start:ios
```

## Optional : create an AVD in Windows

Open a cmd and :

```bash
cd %ANDROID_HOME%/tools/bin
sdkmanager --licenses
sdkmanager "system-images;android-25;google_apis;x86_64"
avdmanager create avd -n avd_25 -k "system-images;android-25;google_apis;x86_64"
```

Now verify that your newly created avd is listed via `avdmanager list avd`
If it appears, go back to this project folder and run `yarn dev`
Android Emulator should pop out and start your virtual device.
The first time it may take some times to init, there is a lot of stuff to download and install.
Just wait 1 or 2 minutes and this app should appears.

## Tips

* if there is structural updates to the project like new deps, modified conf, etc... delete the `platforms` folder and let yarn dev (or build) regenerate it
