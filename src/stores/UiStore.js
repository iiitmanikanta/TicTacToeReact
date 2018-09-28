import { observable, action } from 'mobx'

class UiStore {
  @observable
  message

  constructor() {
    this.initializeData()
  }

  @action.bound
  initializeData() {
    this.message = ''
  }

  @action.bound
  resetMessage() {
    this.message = ''
  }

  @action.bound
  setMessage(message) {
    this.message = message
  }
}

const uiStore = new UiStore()

export default uiStore
