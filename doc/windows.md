# Windows

- [Windows](#windows)
  - [Create an AVD in Windows](#create-an-avd-in-windows)
  - [AMD processors](#amd-processors)

> Make sure you followed every step (expect 7 for AVD) of [the official guide](https://docs.nativescript.org/start/ns-setup-win) before doing this.

## Create an AVD in Windows

You'll need Intel Virtualization, you can check [this page](https://www.intel.fr/content/www/fr/fr/support/articles/000005495/processors.html) to verify that your cpu is ready.

You may need to uninstall Hyper-V to be able to use Vt-d/x.

Open a cmd and :

```bash
cd %ANDROID_HOME%/tools/bin # or cd $ANDROID_HOME/tools/bin in a bash
sdkmanager --licenses # or sdkmanager.bat --licenses
```

If you have an intel cpu :

```bash
sdkmanager "extras;intel;Hardware_Accelerated_Execution_Manager"
"%ANDROID_HOME%/extras/intel/Hardware_Accelerated_Execution_Manager/intelhaxm-android.exe"
"%ANDROID_HOME%/extras/intel/Hardware_Accelerated_Execution_Manager/haxm_check.exe" # should see two yes
sc query intelhaxm # should see "STATE : 4  RUNNING"
```

Now choose your system in the `sdkmanager --list` list, for example `system-images;android-28;google_apis;x86_64`

```bash
sdkmanager "system-images;android-28;google_apis;x86_64"
avdmanager list # or avdmanager.bat list
```

Now choose your device in this list, for example `pixel_xl`

```bash
avdmanager create avd -n avd_28_xl -k "system-images;android-28;google_apis;x86_64" -d pixel_xl # or avdmanager.bat ...
```

Now verify that your newly created avd is listed via `avdmanager list avd`
You should be able to run it via `%ANDROID_HOME%/emulator/emulator -avd avd_28_xl`
If it appears, go back to this project folder and run `npm run dev`
Android Emulator should pop out and start your virtual device.
The first time it may take some times to init, there is a lot of stuff to download and install.
Just wait 1 or 2 minutes and this app should appears.

Because `npm run dev` will choose the first avd it will find, you may need to delete an old avd via `avdmanager delete avd --name avd_28_old`

## AMD processors

Issue on [StackOverflow](https://stackoverflow.com/questions/26355645/error-in-launching-avd-with-amd-processor)

```bash
%ANDROID_HOME%/tools/bin/sdkmanager "system-images;android-28;google_apis;armeabi-v7a"
%ANDROID_HOME%/tools/bin/avdmanager create avd -n avd_armeabi_28_xl -k "system-images;android-28;google_apis;armeabi-v7a" -d pixel_xl
%ANDROID_HOME%/emulator/emulator -avd avd_armeabi_28_xl
```
