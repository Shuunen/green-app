# ADB (Android Debug Bridge)

## On a real Android device

Make sure your phone has dev options activated & adb debug mode on.

If you have adb binary available in your PATH, you should see your device via `adb devices`

If not you can try :

- install [adb drivers](https://adb.clockworkmod.com/)
- to remove previously authorized device to debug your phone

Your device should appears with `npm run ls` (or `tns device`) :

```bash
Connected devices & emulators
Searching for devices...
┌───┬─────────────┬──────────┬───────────────────┬──────────┬───────────┐
│ # │ Device Name │ Platform │ Device Identifier │ Type     │ Status    │
│ 1 │ avd_28      │ Android  │ emulator-5554     │ Emulator │ Connected │
│ 2 │ Device name │ Android  │ DEVICE_ID_123     │ Device   │ Connected │
└───┴─────────────┴──────────┴───────────────────┴──────────┴───────────┘
```

Then you can `tns run android --bundle --device DEVICE_ID_123`

You should see your app running on device and this in console : `Successfully synced application green.nsvue.app on device DEVICE_ID_123`
