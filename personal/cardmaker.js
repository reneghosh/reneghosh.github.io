"uses strict";

const log = console.log;

export class ActionList {
    constructor(actions) {
        const containerElement = document.createElement("div");
        containerElement.setAttribute("class", "actionlist");
        this.buttons = [];
        for (let action of actions) {
            const buttonElement = document.createElement("a");
            buttonElement.setAttribute("href", "#");            
            buttonElement.classList.add("action");
            buttonElement.innerText = action;
            containerElement.appendChild(buttonElement);
            this.buttons.push(buttonElement);
        }
        this.containerElement = containerElement;
    }
    get element(){
        return this.containerElement;
    }
    onclick(func){
        for(let button of this.buttons){
            button.onclick = ev => {
                func(button.innerText);
            }
        }
    }
}
export class Text {
    constructor(text) {
        const element = document.createElement("div");
        element.innerHTML = text;
        this.innerElement = element;
    }
    hide() {
        this.element.classList.add("hidden");
        return this;
    }
    show() {
        this.element.classList.remove("hidden");
        return this;
    }
    get element() {
        return this.innerElement;
    }
    setValue(value) {
        this.innerElement.innerHTML = value;
    }
    set className(className) {
        this.innerElement.classList.add(className);
        return this;
    }
}

export class TextInput {
    constructor(prompt, value) {
        const containerElement = document.createElement("div");
        containerElement.classList.add("container")
        const errorElement = document.createElement("div");
        const promptElement = document.createElement("div");
        errorElement.classList.add("error");
        errorElement.classList.add("hidden");
        promptElement.innerHTML = prompt;
        promptElement.classList.add("prompt");
        const inputElement = document.createElement("input");
        containerElement.appendChild(errorElement);
        containerElement.appendChild(promptElement);
        containerElement.appendChild(inputElement);
        if (value) {
            inputElement.setAttribute("value", value);
        }
        this.containerElement = containerElement;
        this.errorElement = errorElement;
        this.promptElement = promptElement;
        this.inputElement = inputElement;
    }
    hide() {
        this.containerElement.classList.add("hidden");
        return this;
    }
    hideError() {
        this.errorElement.classList.add("hidden");
        return this;
    }
    show() {
        this.containerElement.classList.remove("hidden");
        return this;
    }
    showError(errorMessage) {
        this.errorElement.innerHTML = errorMessage;
        this.errorElement.classList.remove("hidden");
    }
    setValue(value) {
        this.inputElement.value = value;
        return this;
    }
    focus() {
        this.inputElement.focus();
        return this;
    }
    disable() {
        this.inputElement.setAttribute("disabled", true);
        return this;
    }
    onenter(func) {
        this.inputElement.onchange = ev => {
            func(this.inputElement.value);
        }
    }
    set inputType(inputType) {
        this.inputElement.setAttribute("type", inputType);
        return this;
    }
    clear() {
        this.inputElement.value = "";
        return this;
    }
    get element() {
        return this.containerElement;
    }

}

export class SelectInput {
    constructor(prompt, choices, value) {
        const containerElement = document.createElement("div");
        containerElement.classList.add("container")
        const errorElement = document.createElement("div");
        const promptElement = document.createElement("div");
        errorElement.classList.add("error");
        errorElement.classList.add("hidden");
        promptElement.innerHTML = prompt;
        promptElement.classList.add("prompt");
        const selectElement = document.createElement("select");
        containerElement.appendChild(errorElement);
        containerElement.appendChild(promptElement);
        containerElement.appendChild(selectElement);
        this.containerElement = containerElement;
        this.errorElement = errorElement;
        this.promptElement = promptElement;
        this.selectElement = selectElement;
        this.setValues(choices);
    }
    setValues(choices, selectedValue){
        this.selectElement.innerHTML = "";
        for (let choice of choices) {
            const optionElement = document.createElement("option");
            optionElement.innerText = choice;
            if ((selectedValue) && (selectedValue == choice)) {
                optionElement.setAttribute("selected", true);
            }
            this.selectElement.appendChild(optionElement);
        }
        this.choices = choices;
    }
    hide() {
        this.containerElement.classList.add("hidden");
        return this;
    }
    hideError() {
        this.errorElement.classList.add("hidden");
        return this;
    }
    show() {
        this.containerElement.classList.remove("hidden");
        return this;
    }
    showError(errorMessage) {
        this.errorElement.innerHTML = errorMessage;
        this.errorElement.classList.remove("hidden");
    }
    focus() {
        this.selectElement.focus();
        return this;
    }
    disable() {
        this.selectElement.setAttribute("disabled", true);
        return this;
    }
    onselect(func) {
        this.selectElement.onchange = ev => {
            func(this.choices[this.selectElement.selectedIndex]);
        }
    }
    clear() {
        this.selectElement.selectedIndex = 0;
        return this;
    }
    get element() {
        return this.containerElement;
    }

}

export class Card {
    constructor(elementId) {
        const container = document.getElementById(elementId);
        container.classList.add("card");
        this.containerElement = container;
    }
    hide() {
        this.containerElement.classList.add("hidden");
        return this;
    }
    show() {
        this.containerElement.classList.remove("hidden");
        return this;
    }
    addText(content, options) {
        const text = new Text(content);
        if (options) {
            const { hidden, className } = options;
            if (hidden) {
                text.hide();
            }
            if (className) {
                text.className = className;
            }
        }
        this.containerElement.appendChild(text.element);
        return text;
    }
    addTextInput(prompt, options) {
        const textInput = new TextInput(prompt);
        if (options) {
            const { hidden, errorHidden, inputType } = options;
            if (hidden) {
                textInput.hide();
            }
            if (errorHidden) {
                textInput.hideError();
            }
            if (inputType) {
                textInput.inputType = inputType;
            }
        }
        this.containerElement.appendChild(textInput.element);
        if (options) {
            const { focused } = options;
            if (focused) {
                textInput.focus();
            }
        }
        return textInput;
    }
    addSelectInput(prompt, choices, options) {
        const selectInput = new SelectInput(prompt, choices);
        if (options) {
            const { hidden, errorHidden } = options;
            if (hidden) {
                selectInput.hide();
            }
            if (errorHidden) {
                selectInput.hideError();
            }
        }
        this.containerElement.appendChild(selectInput.element);
        if (options) {
            const { focused } = options;
            if (focused) {
                selectInput.focus();
            }
        }
        return selectInput;
    }
    addActions(actions){
        const actionsInput = new ActionList(actions);
        this.containerElement.appendChild(actionsInput.element);
        return actionsInput;
    }
}


