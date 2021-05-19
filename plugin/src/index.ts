import { getSettings, setSettings } from './utilities/settings'
import { getAccessToken, setAccessToken } from './utilities/accessToken'
import getJson from './utilities/getJson'
import getFileId from './utilities/getFileId'
import UserSettings from '../types/settings'
import getVersionDifference from './utilities/getVersionDifference'
import config from './utilities/config'

// initiate UI
figma.showUI(__html__, {
  visible: false,
  width: config.settingsDialog.width,
  height: config.settingsDialog.height
})
// Get the user settings
const userSettings: UserSettings = getSettings()

// ---------------------------------
// INIT EXPORT TO FILE
// exports the design tokens to a file
if (figma.command === 'exportInit') {
  // wrap in function because of async client Storage
  const openUi = async () => {
    figma.ui.show()
    // sent settings to UI
    figma.ui.postMessage({
      command: 'exportInit',
      settings: userSettings,
      data: {
        filename: `${figma.root.name || 'Unknown File'}`,
        docName: figma.root.name,
        id: figma.fileKey,
        data: getJson(figma, userSettings)
      }
    })
    // @ts-ignore
    figma.ui.show()
  }
  // run function
  openUi()
}


// ---------------------------------
// EXPORT TO FILE
// exports the design tokens to a file
if (figma.command === 'export') {
  // write tokens to json file
  figma.ui.postMessage({
    command: 'export',
    data: {
      filename: `${figma.root.name || 'Unknown File'}`,
      docName: figma.root.name,
      id: figma.fileKey,
      data: getJson(figma, userSettings)
    }
  })
}


/**
 * React to messages
 */
figma.ui.onmessage = async (message) => {
  /**
   * on closePlugin
   * close plugin and show notification if available
   */
  if (message.command === 'closePlugin') {
    // show notification if send
    if (message.notification !== undefined && message.notification !== '') {
      figma.notify(message.notification)
    }
    // close plugin
    figma.ui.hide()
    figma.closePlugin()
  }

  /**
   * on saveSettings
   * save settings, access token and close plugin
   */
  if (message.command === 'saveSettings') {
    // store settings
    setSettings(message.settings)
    // accessToken
    // await setAccessToken(getFileId(figma), message.accessToken)

    // close plugin
    figma.ui.hide()
  }
}
