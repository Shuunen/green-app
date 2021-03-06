# Green App

[![GitHub license](https://img.shields.io/github/license/shuunen/green-app.svg?color=informational)](https://github.com/Shuunen/green-app/blob/master/LICENSE)

[![Build Status](https://travis-ci.org/Shuunen/green-app.svg?branch=master)](https://travis-ci.org/Shuunen/green-app)
[![David](https://img.shields.io/david/shuunen/green-app.svg)](https://david-dm.org/shuunen/green-app)
[![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/Shuunen/green-app.svg)](https://lgtm.com/projects/g/Shuunen/green-app)
[![Scrutinizer Score](https://scrutinizer-ci.com/g/Shuunen/green-app/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Shuunen/green-app)

> A native application built with NativeScript-Vue

- [Green App](#green-app)
  - [Prerequisites](#prerequisites)
  - [Guides](#guides)
  - [Usage](#usage)
  - [Tips](#tips)
  - [About deep linking](#about-deep-linking)
  - [Upgrading stack](#upgrading-stack)
  - [TODO](#todo)
  - [Thanks](#thanks)

## Prerequisites

- Node >= 12
- [NativeScript](https://nativescript-vue.org/en/docs/getting-started/installation/)

## Guides

**Please** follow the [NativeScript guide](https://nativescript-vue.org/en/docs/getting-started/installation/) before looking at these :

- [ADB](doc/adb.md)
- [Linux](doc/linux.md)
- [MacOs](doc/mac-os.md)
- [Windows](doc/windows.md)

## Usage

```bash
npm install # Install dependencies
npm start # Build for dev
npm run build # Build for production
npm run debug # Build, watch for changes and debug the application
```

## Tips

- if there is structural updates to the project like new deps, modified conf, etc... delete the `platforms` folder and let `npm run dev` (or build) regenerate it

## About deep linking

Access via `greenapporder://my-page?param=42` scheme is setup on both Android & iOS.

Access via `https://green-app-order.fr/my-page?param=42` scheme is setup on Android only (for now).

Keep in mind that the second option will not open the app right away because it's a web link and the local browser can open it too. So the first time user will click a link like this it will be prompted to choose which app to use to open this link.

Also, because the host `green-app-order.fr` does not exists the deep linking will not work.

To edit this deep linking : `app\App_Resources\Android\src\main\AndroidManifest.xml` & `app\App_Resources\iOS\Info.plist`

When a deep link is catch by `app\plugins\url-handler.js` you will see a console log with details.

## Upgrading stack

- like described in [their docs](https://docs.nativescript.org/releases/upgrade-instructions)
- like a smart-ass : follow the [getting started with NS Vue](https://nativescript-vue.org/en/docs/getting-started/quick-start/) and create a new project, then compare & upgrade this one accordingly
- like a bad-ass : `npm run update`, try dev and build to check that everything is still working

Known problems :

- **clean-webpack-plugin** : version `1.0.1` is compatible with the current NativeScript generated `webpack.config.js` but the upper major version are not. In `1.0.1` this module is imported like this `const CleanWebpackPlugin = require('clean-webpack-plugin')` but should be imported with `const { CleanWebpackPlugin } ...` in the next versions. So let's wait for NativeScript to generate updated webpack config to update this module.

## TODO

- production build should be `tns build <platform> --env.production` according to the last stack readme

## Thanks

- [Shields.io](https://shields.io) : for the nice badges on top of this readme
- [Travis-ci.org](https://travis-ci.org) : for providing free continuous deployments
