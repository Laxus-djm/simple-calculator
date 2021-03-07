class Calculator{
    constructor(pte,cte){
        this.pte=pte
        this.cte=cte
        this.clearAll()
        console.log(typeof this.currentOperand)

    }

    clearAll(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    showNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand+number
        
    }

 
    chooseOperation (operation){
        if(this.currentOperand==='') return
        if(this.previousOperand!=='') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){

        let result
        const prev = parseFloat(this.currentOperand)
        const curr = parseFloat(this.previousOperand)
        if(isNaN(prev) || isNaN(curr)) return

        switch(this.operation){
            case '+':
                result=curr+prev
                break
            case '-':
                result=curr-prev
                break
            case '*':
                result=curr*prev
                break
            case '/':
                result=curr/prev
                break
            default:
                return
        }
        this.currentOperand=result
        this.operation=undefined
        this.previousOperand=''


    }  

    displayNumber(number){
        const flaotNumber = parseFloat(number)
        if(isNaN(flaotNumber))return''

        return flaotNumber.toLocaleString('en')
    }

    updateOutput(){ 
        this.cte.innerText = this.displayNumber(this.currentOperand) 
        this.pte.innerText =this.displayNumber( this.previousOperand)
        if(this.operation!=null){
            this.pte.innerText = this.displayNumber( this.previousOperand)+this.operation
        }
        
    }


}



const numbersButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearAllButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numbersButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.showNumber(button.innerText)
        calculator.updateOutput()
        
     
    })
})

clearAllButton.addEventListener('click', ()=>{
    calculator.clearAll()
    calculator.updateOutput()
})

operationButtons.forEach(operation =>{
    operation.addEventListener('click', () =>{
        calculator.chooseOperation(operation.innerText)
        calculator.updateOutput()
    })
})


equalsButton.addEventListener('click' , () =>{
    calculator.compute()
    calculator.updateOutput()
})

deleteButton.addEventListener('click' , () =>{
    calculator.delete()
    calculator.updateOutput()
})





