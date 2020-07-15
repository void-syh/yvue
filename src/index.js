import Observer from './observe/index.js'
import Compiler from './compile/index.js'

export default class Yvue {
    constructor(vm) {
        this.el = vm.el
        this.data = vm.data
        new Observer(this.data);
        new Compiler(this.el, this);
    }
}

window.yvue = Yvue;