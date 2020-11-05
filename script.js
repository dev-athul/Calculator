const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalsButton=document.querySelector('[data-equals]');
const deleteButton=document.querySelector('[data-delete]');
const allClearButton=document.querySelector('[data-all-clear]');
const prevTxt=document.querySelector('[data-prev-operand]');
const currentTxt=document.querySelector('[data-current-operand]');

class Calculator{
    constructor(prevTxt,currentTxt){
        this.prevTxt=prevTxt;
        this.currentTxt=currentTxt;
        this.clear();
    }

    clear(){
        this.currentOperand='';
        this.prevOperand='';
        this.operation= undefined;
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number==='.'&&this.currentOperand.includes('.')) return;
        this.currentOperand=this.currentOperand.toString()+number.toString();
}

    chooseOperation(operation){
        if(this.currentOperand==='') return;
        if(this.prevOperand!==''){
            this.compute();
        }
        this.operation=operation;
        this.prevOperand=this.currentOperand;
        this.currentOperand='';
    }
    
    compute(){
        let result;
        const prev=parseFloat(this.prevOperand);
        const current=parseFloat(this.currentOperand);
        if ( isNaN(prev) || isNaN(current) ) return;
        switch(this.operation){
            case'+':
            result=prev+current;
            break;
            case'-':
            result=prev-current;
            break;
            case'*':
            result=prev*current;
            break;
            case'/':
            result=prev/current;
            break;
            default:
                return;            
        }
        this.currentOperand=result;
        this.operation=undefined;
        this.prevOperand='';
    }
    
    
    getDisplayNumber(number){
        const stringNumber=number.toString();
        const integerDigits=parseFloat(stringNumber.split('.')[0]);
        const decimalDigits=stringNumber.split('.')[1];

        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay='';
        }else{
            integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits : 0});
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.currentTxt.innerText=this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.prevTxt.innerText=`${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        }else{
            this.prevTxt.innerText='';
        }
    }
}

const calcObj=new Calculator(prevTxt,currentTxt);

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calcObj.appendNumber(button.innerText);
        calcObj.updateDisplay();
    });
});

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calcObj.chooseOperation(button.innerText);
        calcObj.updateDisplay();
    });
});

equalsButton.addEventListener('click',button=>{
    calcObj.compute();
    calcObj.updateDisplay();
});

allClearButton.addEventListener('click',button=>{
    calcObj.clear();
    calcObj.updateDisplay();
});

deleteButton.addEventListener('click',button=>{
    calcObj.delete();
    calcObj.updateDisplay();
})