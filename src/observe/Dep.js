export default class Dep {
    constructor() {
        this.subs = [];
    }

    depend(watcher) {
        this.subs.push(watcher);
    }

    notify() {
        this.subs.map((sub) => {
            sub.update();
        })
    }
}
Dep.target = null;