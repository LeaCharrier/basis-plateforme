import { getSettings } from './utilities/settings'
import getJson from './utilities/getJson'
import UserSettings from '../types/settings'
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
// EXPORT TO FILE
// exports the design tokens to a file
if (figma.command === 'export') {
  // write tokens to json file
  figma.ui.postMessage({
    command: 'export',
    data: {
      filename: `${userSettings.filename}.json`,
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
}
