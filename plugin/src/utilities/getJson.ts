import getTokenJson from './getTokenJson'
import buildFigmaData from './buildFigmaData'
import UserSettings from '../../types/settings'
/**
 * @name getJson
 * @param {PluginAPI} figma
 * @param userSettings
 * @param {boolean} stringify
 */
const getJson = (figma: PluginAPI, userSettings: UserSettings, stringify: boolean = true) => {
  // construct figma data object
  const figmaData = buildFigmaData(figma)

  if (stringify === false) {
    return getTokenJson(figmaData, 'styleDictionary')
  }
  // get tokens as stringified json
  return JSON.stringify(getTokenJson(figmaData, 'styleDictionary'))
}

export default getJson
