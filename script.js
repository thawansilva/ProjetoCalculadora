const numbersButtons = document.querySelectorAll('[data-number]');
const operatorsButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-clear-all]');
const equalButton = document.querySelector('[data-equal]');
const previousResultTxt = document.querySelector('[data-previous]')
const currentResultTxt = document.querySelector('[data-current]')

class Calculator {
    constructor(previousResultTxt, currentResultTxt) {
        this.previousResultTxt = previousResultTxt;
        this.currentResultTxt = currentResultTxt;
        this.clear();
    }
    // Formatação dos números
    formateDisplayNumber(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".")
    }
    // Adicionando número
    appendNumber(num) {
        if (this.currentOperand.includes('.') && num === '.') return;
        this.currentOperand = `${this.currentOperand}${num.toString()}`
    }
    // Realizando os cálculos
    calculate() {
        let result;

        const _previousOperation = parseFloat(this.previousOperand);
        const _currentOperation = parseFloat(this.currentOperand);

        if (isNaN(_previousOperation) || isNaN(_currentOperation)) return;
        switch (this.operation) {
            case '+':
                result = _previousOperation + _currentOperation;
                break
            case '-':
                result = _previousOperation - _currentOperation;
                break
            case 'x':
                result = _previousOperation * _currentOperation;
                break
            case '÷':
                result = _previousOperation / _currentOperation;
                break
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined
        this.previousOperand = '';
    }

    doOperation(operator) {
        if (this.currentOperand == '') return;
        if (this.previousOperand != '') {
            this.calculate()
        }
        this.operation = operator;
        this.previousOperand = `${this.currentOperand}`;
        this.currentOperand = '';
    }
    // Deletando um número
    delete() {
        if (this.currentOperand == '') return;
        this.currentOperand = this.currentOperand.slice(0, -1)
        this.updateDisplay()
    }
    // Limpando o display
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    // Atualizar o display a cada operação.
    updateDisplay() {
        this.previousResultTxt.innerText = `${this.formateDisplayNumber(this.previousOperand)} ${this.operation || ''}`
        this.currentResultTxt.innerText = `${this.formateDisplayNumber(this.currentOperand)}`
    }
}

const calculator = new Calculator(previousResultTxt, currentResultTxt);

clearAllButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

numbersButtons.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

operatorsButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.doOperation(operator.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})