# MacOS

- [MacOS](#macos)
  - [Installing on macOS](#installing-on-macos)
    - [XCode](#xcode)
    - [Homebrew](#homebrew)
    - [Node](#node)
    - [xcodeproj, cocoapods, six](#xcodeproj-cocoapods-six)
  - [Building for iOS](#building-for-ios)

## Installing on macOS

### XCode

Install XCode 9 (macOS 10.13) or 10 (macOS 10.14) from Mac AppStore or Apple's Developer site.

### Homebrew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Node

Install NVM :

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

Install Node 11.x using NVM :

```bash
nvm install 11.10
nvm alias default 11.10
```

### xcodeproj, cocoapods, six

xcodeproj :

```bash
sudo gem install -n /usr/local/bin xcodeproj
```

cocoapods :

```bash
sudo gem install -n /usr/local/bin cocoapods
pod setup
```

six :

```bash
pip install six
```

## Building for iOS

Building for production :

```bash
npm run build:ios
```

Starting the app in iOS simulator or iOS device :

```bash
npm run start:ios
```
