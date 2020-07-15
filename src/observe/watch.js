import Dep from './Dep'
import { getValue } from '../util/util';

export default class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.get();
    }

    get() {
        Dep.target = this;
        getValue(this.vm.data, this.exp);
        Dep.target = null;
    }

    update() {
        this.cb(getValue(this.vm.data, this.exp));
    }
}