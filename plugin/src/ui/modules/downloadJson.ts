import constants from "../../constants"

const handleJsonRes = (parent, message: string, e = null) => {
  // send success messgae
  parent.postMessage({
    pluginMessage: {
      command: 'closePlugin',
      notification: message
    }
  }, '*')
  // log error
  if (e)
    console.error('Export error: ', e)
}

const downloadJson = (parent, link: HTMLLinkElement, filename: string, json: string) => {
  // if no tokens are present
  if (json === '[]') {
    handleJsonRes(parent, '⛔️ No design token detected!')
    // abort
    return
  }
  // set name
  // @ts-ignore
  const name = filename || 'design-tokens'
  // try to export tokens
  try {
    const body = {
      name,
      content: JSON.parse(json),
      date: (new Date()).getTime()
    }

    fetch(constants.sendURI, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async r => {
      console.log(r)
      console.log(await r.json())
      handleJsonRes(parent, '🎉 Design tokens sent succesfully!')
    }).catch(e => {
      handleJsonRes(parent, '⛔️ Sending failed!', e)
    })
  } catch (error) {
    handleJsonRes(parent, '⛔️ Sending failed!', error)
  }
}

export default downloadJson
