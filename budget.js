const budgetInput= document.getElementById('budget-input');
const budgetForm= document.getElementById('budget-form');
const budgetSubmit= document.getElementById('budget-submit');
const firstError= document.getElementById('budget-hidden');
const secondError= document.getElementById('amount-hidden');
const expenseInput= document.getElementById('expense-input');
const amountInput= document.getElementById('amount-input');
const expenseSubmit= document.getElementById('expense-submit');
const displayBudget= document.getElementById('display-budget');
const displayExpenses= document.getElementById('display-expenses');
const displayBalance=  document.getElementById('display-balance');
const expenseForm=  document.getElementById('expense-form');
const listUl=  document.getElementById("list-ul");

            // ////////prevendefault
budgetForm.addEventListener('submit',(e)=>{
e.preventDefault()
})
expenseForm.addEventListener('submit',(e)=>{
e.preventDefault();
})



                    // instanciar objetos 
class Expenses {
    constructor(exp,amo){
        this.exp = exp,
        this.amo = amo
    } 
}

let objects = [];
let budget;
let fillBudget = false;

                // ///// budget display /////////
                
function calcBudget(){
    budget = parseInt(budgetInput.value) 
    let sum = 0;
    let rest = 0;
    if(budgetInput.value != '' && !isNaN(budgetInput.value) && budgetInput.value > 0 ){
        sum = Number(displayBudget.textContent) + Number(budgetInput.value);
        rest = Number(sum) - Number(displayExpenses.textContent)
        displayBudget.textContent = sum;
        displayBalance.textContent = rest;
        fillBudget = true;
        budgetForm.reset()
    }else{
        firstError.classList.remove('hidden')
        setTimeout(()=>{
            firstError.classList.add('hidden')
        },3000)
    }
}


let count = 0;
let expenses = 0;
let balance = 0;

function showExpenses(){
    if(expenseInput.value != '' && isNaN(expenseInput.value) && amountInput.value > 0 && amountInput.value != '' && !isNaN(amountInput.value) && fillBudget){
        objects.push(new Expenses(expenseInput.value,amountInput.value));
        expenses += Number(objects[count].amo);
        displayExpenses.textContent = expenses;
        balance = budget - Number(displayExpenses.textContent);
        displayBalance.textContent = balance;  
        listUl.innerHTML +=`<li class='li_item' id='${count}'><span class='list__span'>${objects[count].exp}</span><span class='list__span'>${objects[count].amo}</span><span><button class="list__btn"><img class="list__img" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt=""></button></span></li>`
        count++
        expenseForm.reset()
    }else{
        secondError.classList.remove('hidden')
            setTimeout(()=>{
            secondError.classList.add('hidden')
        },3000)
    }
}


//         // delete event

listUl.addEventListener('click',(e)=>{
    if(e.target.classList.contains('list__img')){
        let getEl = e.target.parentElement.parentElement.parentElement.id
        expenses -= Number(objects[getEl].amo)
        balance += Number(objects[getEl].amo); 
        displayExpenses.textContent = expenses;
        displayBalance.textContent = balance;
        e.target.parentElement.parentElement.parentElement.remove();
    }
})

                                 // buttons events 


budgetSubmit.addEventListener('click',calcBudget);
expenseSubmit.addEventListener('click',showExpenses)