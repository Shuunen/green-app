# Green App

> A native application built with NativeScript-Vue

- [Green App](#green-app)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)
    - [On a real Android device](#on-a-real-android-device)
  - [Tips](#tips)
  - [Upgrading stack](#upgrading-stack)
  - [TODO](#todo)

## Prerequisites

- Node >= 10
- Npm >= 6
- [NativeScript](https://docs.nativescript.org/angular/start/quick-setup)
- [Windows guide](doc/windows.md) / [MacOs guide](doc/mac-os.md)

## Usage

```bash
npm install # Install dependencies
npm start # Build for dev
npm run build # Build for production
npm run debug # Build, watch for changes and debug the application
```

### On a real Android device

Make sure your phone has dev options activated & adb debug mode on.

Your device should appears with `npm run ls` (or `tns device`) :

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

## Tips

- if there is structural updates to the project like new deps, modified conf, etc... delete the `platforms` folder and let `npm run dev` (or build) regenerate it

## Upgrading stack

- like a smart-ass : follow the [getting started with NS Vue](https://nativescript-vue.org/en/docs/getting-started/quick-start/) and create a new project, then compare & upgrade this one accordingly
- like a bad-ass : `npm run update`, try dev and build to check that everything is still working

## TODO

- production build should be `tns build <platform> --env.production` according to the last stack readme
