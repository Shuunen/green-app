# Green App

> A native application built with NativeScript-Vue

- [Green App](#green-app)
  - [Prerequisites](#prerequisites)
  - [Guides](#guides)
  - [Usage](#usage)
  - [Tips](#tips)
  - [Upgrading stack](#upgrading-stack)
  - [TODO](#todo)

## Prerequisites

- Node >= 10
- Npm >= 6
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

## Upgrading stack

- like a smart-ass : follow the [getting started with NS Vue](https://nativescript-vue.org/en/docs/getting-started/quick-start/) and create a new project, then compare & upgrade this one accordingly
- like a bad-ass : `npm run update`, try dev and build to check that everything is still working

## TODO

- production build should be `tns build <platform> --env.production` according to the last stack readme
