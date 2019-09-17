import { knownFolders } from 'tns-core-modules/file-system'

export default class ConfigService {

  loadConfig (configName) {
    let appFolder = knownFolders.currentApp()
    let cfgFile = appFolder.getFile('config/' + configName +'.json')

    return JSON.parse(cfgFile.readTextSync())
  }
}
