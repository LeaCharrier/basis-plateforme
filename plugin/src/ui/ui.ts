/* eslint-env browser */
// @ts-nocheck
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import { setFormSettings, getFormSettings } from './modules/settings'
import downloadJson from './modules/downloadJson'
import constants from "../constants";

// figmaApi
const figmaUIApi: UIAPI = parent as UIAPI

// actions link
const settingsForm: HTMLFormElement = document.getElementById('settingsForm') as HTMLFormElement
const saveButton: HTMLButtonElement = document.getElementById('saveButton') as HTMLButtonElement
const cancelButton: HTMLButtonElement = document.getElementById('cancelButton') as HTMLButtonElement

let cbk = null

// ---------------------------------
// listen to messages
// eslint-disable-next-line
onmessage = (event: Event) => {
  // capture message
  const message = event.data.pluginMessage

  cbk = null

  // export json file
  if (message.command === 'export') {
    // download
    downloadJson(parent, message.data.filename, message.data.data)
  }

  // when settings date is send to ui
  if (message.command === 'exportInit') {
    // fill form with data

    cbk = (settings) => downloadJson(parent, message.data.filename, message.data.data, settings)

    setFormSettings(settingsForm, message.settings)
    // downloadJson(parent, downloadLink, message.data.filename, message.data.data)
  }
}

saveButton.addEventListener('click', (e) => {
  e.preventDefault()
  // if form is valid
  if (settingsForm.checkValidity() === true) {
    // get values from form
    const { settings } = getFormSettings(settingsForm)

    if (cbk) {
      cbk(settings)
    }

    // sent to index saveSettings method
    figmaUIApi.postMessage({
      pluginMessage: {
        command: 'saveSettings',
        settings: settings
      }
    }, '*')
  }
})

// ---------------------------------
// CANCEL: close settings without saving
cancelButton.addEventListener('click', () => {
  figmaUIApi.postMessage({
    pluginMessage: {
      command: 'closePlugin'
    }
  }, '*')
})

// ---------------------------------
// set focus to first input of form
settingsForm.querySelector('input[type=text]').focus()
