import Dep from './Dep.js'

export default class Observer {
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        Object.keys(data).map((key) => {
            const value = data[key];
            this.defineReactive(data, key, value);
            if (typeof value === "object") {
                this.observe(value)
            }
        })
    }

    defineReactive(data, key, value) {
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.target) {
                    dep.depend(Dep.target);
                }
                return value;
            },
            set(newValue) {
                if (newValue != value) {
                    value = newValue;
                    dep.notify();
                }
            }
        })
    }
}