export function getValue(data, exp) {
    const value = exp.trim().split('.');
    return value.reduce((data, key) => {
        return data[key];
    }, data);
}

export function updateText(node, value) {
    node.nodeValue = value;
}

export function updateInput(node, value) {
    node.value = value;
}

export function setValue(data, exp, newValue) {
    const value = exp.trim().split('.');
    return value.reduce((data, key, index) => {
        if (index === value.length - 1) {
            data[key] = newValue;
        }
        return data[key];
    }, data);
}