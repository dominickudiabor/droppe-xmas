import { DialogType, ToggleDialogAction, TOGGLE_DIALOG } from '../types'

export function toggleDialog(dialog: DialogType): ToggleDialogAction {
  return {
    type: TOGGLE_DIALOG,
    payload: {
      dialog,
    },
  }
}
