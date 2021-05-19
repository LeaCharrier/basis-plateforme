/* eslint-env browser */
import Settings from '../../../types/settings'

const settingIds = {
  teamId: '#teamId',
}

const getFormSettings = (form: HTMLFormElement): { settings: Settings } => {
  // get settings
  const settings = {
    teamId: (form.querySelector(settingIds.teamId) as HTMLInputElement).value
  }

  return {
    settings
  }
}

const setFormSettings = (form: HTMLFormElement, settings: Settings): void => {
  // set settings
  (form.querySelector(settingIds.teamId) as HTMLInputElement).value = settings.teamId || null;
}

export { settingIds, getFormSettings, setFormSettings }
