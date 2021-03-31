"uses strict";

const log = console.log;

export class Action {
    action;
    buttonElement;
    constructor(action) {
        this.action = action;
        const buttonElement = document.createElement("a");
        buttonElement.setAttribute("href", "#");
        buttonElement.classList.add("action");
        buttonElement.innerText = action;
        this.buttonElement = buttonElement;
    }
    onclick(func) {
        this.buttonElement.onclick = ev => {
            func(this.buttonElement.innerText);
        }
    }
    getElement(){
        return this.buttonElement;
    }
}

export class ActionList {
    containerElement;
    constructor() {
        const containerElement = document.createElement("div");
        containerElement.setAttribute("class", "actionlist");
        this.containerElement = containerElement;
    }
    addAction(actionLabel) {
        const action = new Action(actionLabel);
        this.containerElement.appendChild(action.getElement());
        return action;
    }
    getElement() {
        return this.containerElement;
    }
}

export class Check {
    checkLabel;
    checkElement;
    containerElement;
    constructor(checkLabel, name) {
        this.checkLabel = checkLabel;
        const containerElement = document.createElement("div");
        containerElement.classList.add("check");
        const checkElement = document.createElement("input");
        checkElement.setAttribute("type", "checkbox");
        checkElement.setAttribute("name", name);
        checkElement.setAttribute("id", name);
        const labelElement = document.createElement("label")
        labelElement.classList.add("checkLabel");
        labelElement.setAttribute("for", name);
        labelElement.innerHTML = checkLabel;
        this.checkElement = checkElement;
        containerElement.appendChild(checkElement);
        containerElement.appendChild(labelElement);
        this.containerElement = containerElement;
    }

    onclick(func) {
        this.checkElement.onchange = ev => {
            func(this.checkElement.checked);
        }
    }
    getElement(){
        return this.containerElement;
    }
}

export class CheckList {

    containerElement;

    constructor() {
        const containerElement = document.createElement("div");
        containerElement.setAttribute("class", "checkList");
        this.containerElement = containerElement;
    }
    addCheck(checkLabel, name) {
        const check = new Check(checkLabel, name);
        this.containerElement.appendChild(check.getElement());
        return check;
    }
    getElement() {
        return this.containerElement;
    }
}

export class Text {
    innerElement;
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
    getElement() {
        return this.innerElement;
    }    
    setValue(value) {
        this.innerElement.innerHTML = value;
    }
    setClassName(className) {
        this.innerElement.classList.add(className);
        return this;
    }
}

export class TextInput {
    containerElement;
    errorElement;
    promptElement;
    inputElement;
    constructor(prompt) {
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
    getValue() {
        return this.inputElement.value;
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
    setInputType(inputType) {
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
    containerElement;
    errorElement;
    promptElement;
    selectElement;
    choices;
    constructor(prompt, choices) {
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
        this.setValues(choices, undefined);
    }
    setValues(choices, selectedValue) {
        this.selectElement.innerHTML = "";
        for (let choice of choices) {
            const optionElement = document.createElement("option");
            optionElement.innerText = choice;
            if ((selectedValue) && (selectedValue == choice)) {
                optionElement.setAttribute("selected", "true");
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
    getValue(){
        return this.selectElement.value;
    }
    getElement() {
        return this.containerElement;
    }

}

export class Card {
    containerElement;
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
                text.setClassName(className);
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
                textInput.setInputType(inputType);
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
    addActions() {
        const actionsInput = new ActionList();
        this.containerElement.appendChild(actionsInput.getElement());
        return actionsInput;
    }
    addCheckList() {
        const checkList = new CheckList();
        this.containerElement.appendChild(checkList.getElement());
        return checkList;
    }
}


