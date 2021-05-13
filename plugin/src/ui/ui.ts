/* eslint-env browser */
// @ts-nocheck
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import downloadJson from './modules/downloadJson'

// download link
const downloadLink: HTMLLinkElement = document.getElementById('downloadLink') as HTMLLinkElement
// ---------------------------------
// listen to messages
// eslint-disable-next-line
onmessage = (event: Event) => {
  // capture message
  const message = event.data.pluginMessage
  // export json file
  if (message.command === 'export') {
    // download
    downloadJson(parent, downloadLink, message.data.filename, message.data.data)
  }
}
