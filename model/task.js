const SERVER = require('../utils/leancloud-storage');

class Task extends SERVER.Object {
  get task() {
    return this.get('tasks');
  }
  set task(value) {
    this.set('tasks', value);
  }
  get objectId() {
    return this.get('objectId');
  }
}
SERVER.Object.register(Task, 'Task');
module.exports = Task;