import { getValue, updateText, updateInput, setValue } from "../util/util";
import Watcher from '../observe/watch'
export default class Compiler {
    constructor(el, vm) {
        this.vm = vm;
        this.el = document.querySelector(el);
        this.vdom = this.makeVdom();
        this.compile(this.vdom);
        this.el.appendChild(this.vdom);
    }

    makeVdom() {
        const fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = this.el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }

    compile(vdom) {
        const childrens = vdom.childNodes;
        Array.from(childrens).map((node) => {
            if (node.nodeType === 1) {
                this.compile(node);
                this.compileElement(node);
            } else {
                this.compileText(node);
            }
        })
    }

    compileText(node) {
        let content = node.nodeValue;
        const reg = /\{\{(.+)\}\}/g;
        if (reg.test(content)) {
            let exp = content.replace(reg, (a, b) => {
                return b;
            })
            new Watcher(this.vm, exp, (newValue) => {
                updateText(node, newValue)
            })
            const value = getValue(this.vm.data, exp);
            updateText(node, value);
        }
    }

    compileElement(node) {
        const attrs = node.attributes;
        Array.from(attrs).map((attr) => {
            let name = attr.name;
            let exp = attr.value;
            if (name === 'y-model') {
                new Watcher(this.vm, exp, (newValue) => {
                    updateInput(node, newValue);
                })
                node.addEventListener('input', (e) => {
                    const value = e.target.value;
                    setValue(this.vm.data, exp, value);
                })
                const value = getValue(this.vm.data, exp);
                updateInput(node, value);
            }
        })
    }
}