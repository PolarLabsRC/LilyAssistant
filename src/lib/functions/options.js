import UnknownOptionIcon from "../images/unknownOption.svg"
export const OPTION_TYPE = Object.freeze({
    input: Symbol("input"),
    button: Symbol("settings"),
    flag: Symbol("settings"),

});

const defaultOption = {
    name: "Unknown",
    description: "Unknown",
    type: OPTION_TYPE.button,
    callback: () => {},
    showIcon: true,
    icon: UnknownOptionIcon,
    status: undefined
}

export class OptionRecord {
    constructor(options) {
        Object.assign(this, defaultOption, options)
    }
}