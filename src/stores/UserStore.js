import { observable, action } from 'mobx'

class User {
  @observable
  name

  constructor() {
    this.initializeData()
  }

  @action.bound
  initializeData() {
    this.name = 'User'
  }
}

const user = new User()

export default user
