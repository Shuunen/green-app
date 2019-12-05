# Windows

- [Windows](#windows)
  - [Create an AVD in Windows](#create-an-avd-in-windows)
  - [AMD processors](#amd-processors)

## Create an AVD in Windows

You'll need Intel Virtualization !

Open a cmd and :

```bash
cd %ANDROID_HOME%/tools/bin # or cd $ANDROID_HOME/tools/bin in a bash
sdkmanager --licenses # or sdkmanager.bat --licenses
sdkmanager --list
```

Now choose your system in this list, for example `system-images;android-25;google_apis;x86_64`

```bash
sdkmanager "system-images;android-25;google_apis;x86_64"
avdmanager list # or avdmanager.bat list
```

Now choose your device in this list, for example `pixel_xl`

```bash
avdmanager create avd -n avd_25_xl -k "system-images;android-25;google_apis;x86_64" -d pixel_xl # or avdmanager.bat ...
```

Now verify that your newly created avd is listed via `avdmanager list avd`
You should be able to run it via `%ANDROID_HOME%/emulator/emulator -avd avd_25_xl`
If it appears, go back to this project folder and run `npm run dev`
Android Emulator should pop out and start your virtual device.
The first time it may take some times to init, there is a lot of stuff to download and install.
Just wait 1 or 2 minutes and this app should appears.

Because `npm run dev` will choose the first avd it will find, you may need to delete an old avd via `avdmanager delete avd --name avd_25_old`

## AMD processors

Issue on [StackOverflow](https://stackoverflow.com/questions/26355645/error-in-launching-avd-with-amd-processor)

```bash
%ANDROID_HOME%/tools/bin/sdkmanager "system-images;android-25;google_apis;armeabi-v7a"
%ANDROID_HOME%/tools/bin/avdmanager create avd -n avd_armeabi_25_xl -k "system-images;android-25;google_apis;armeabi-v7a" -d pixel_xl
%ANDROID_HOME%/emulator/emulator -avd avd_armeabi_25_xl
```
