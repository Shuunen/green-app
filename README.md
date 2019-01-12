# Green App

> A native application built with NativeScript-Vue

## Prerequisites

* Node >= 8.12.0
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