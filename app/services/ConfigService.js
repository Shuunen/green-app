import { knownFolders } from 'tns-core-modules/file-system'

export default class ConfigService {
  loadConfig (configName) {
    let appFolder = knownFolders.currentApp()
    let cfgFile = appFolder.getFile('./config/' + configName + '.json')

    console.log(appFolder)
    console.log(configName)
    console.log(cfgFile.readTextSync())

    return JSON.parse(cfgFile.readTextSync())
  }
}
