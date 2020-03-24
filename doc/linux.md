# Linux

## Node

Install NVM (not as root !) :

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh
bash
```

Install Node 10 LTS using NVM :

```bash
nvm install 10.17.0
nvm alias default 10.17.0
```

## SDK

Make sure to have the [tools](https://developer.android.com/studio#downloads) available in PATH :

```bash
export ANDROID_HOME=$HOME/Apps/android
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

Then :

```bash
echo "y" | $ANDROID_HOME/tools/bin/sdkmanager "tools" "emulator" "platform-tools" "platforms;android-28" \
     "build-tools;28.0.3" "extras;android;m2repository" "extras;google;m2repository"
$ANDROID_HOME/tools/bin/sdkmanager "system-images;android-28;google_apis;x86_64"
echo no | $ANDROID_HOME/tools/bin/avdmanager create avd -n avd_28_xl -k "system-images;android-28;google_apis;x86_64" -d pixel_xl
```

Now verify that your newly created avd is listed via `$ANDROID_HOME/tools/bin/avdmanager list avd`
You should be able to run it via `emulator -avd avd_28_xl`
If it appears, go back to this project folder and run `npm run dev`
Android Emulator should pop out and start your virtual device.
The first time it may take some times to init, there is a lot of stuff to download and install.
Just wait 1 or 2 minutes and this app should appears.

Because `npm run dev` will choose the first avd it will find, you may need to delete an old avd via `$ANDROID_HOME/tools/bin/avdmanager delete avd --name avd_28_old`
