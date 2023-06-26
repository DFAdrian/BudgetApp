const budgetInput= document.getElementById('budget-input');
const budgetForm= document.getElementById('budget-form');
const budgetSubmit= document.getElementById('budget-submit');
const restart= document.getElementById('restart-btn');
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
const cancel = document.getElementById('modal-false');
const confirm =document.getElementById('modal-true');
let fillBudget = false;
let id = 0;


            //prevendefault
budgetForm.addEventListener('submit',(e)=>{
e.preventDefault()
})
expenseForm.addEventListener('submit',(e)=>{
e.preventDefault();
})



                    // instanciar objetos 
class Expense {
    constructor(item,amount){
        this.item = item;
        this.amount = amount;
    } 
}

       // budget expenses balance and array of objects(expenses)
let storedData = [];
let budget = 0;
let expenses = 0;
let balance = 0;

if(localStorage.getItem("expenses") === null){
    localStorage.setItem('expenses', JSON.stringify(storedData));
}

storedData = JSON.parse(localStorage.getItem("expenses"));

window.addEventListener('load', () => {
    if(localStorage.getItem('expenses').length > 1 && localStorage.getItem('budget') !== null ){
        budget = localStorage.getItem('budget');
        displayBudget.textContent = budget;
        calcExpenses(storedData);
        calcBalance(budget,expenses);
        showData(expenses,balance);
        fillBudget = true;
        displayList();
    }
});


//calculate expenses and balance functions

function calcExpenses(object){
    expenses = 0;
    object.map(el=>{
        expenses += el.amount;
    })
}

function calcBalance(bud,exp){
    balance = bud - exp;
}




function showData(ex,bal){
    displayExpenses.textContent = ex;
    displayBalance.textContent = bal;
}



// show budget 

function calcBudget(){
    if(budgetInput.value != '' && !isNaN(budgetInput.value) && budgetInput.value > 0 && !fillBudget){
        budget = parseInt(budgetInput.value);
        displayBudget.textContent = budget;
        fillBudget = true;
        budgetForm.reset();
        localStorage.setItem('budget', budget);
    }else{
        firstError.classList.remove('hidden')
        setTimeout(()=>{
            firstError.classList.add('hidden')
        },3000)
        budgetForm.reset();
    }
}

function displayList() {
  listUl.innerHTML = '';
  id = 0;
  const fragment = document.createDocumentFragment();

  storedData.forEach((el) => {
    const li = document.createElement('li');
    li.className = 'li_item';
    li.id = id;

    const itemSpan = document.createElement('span');
    itemSpan.className = 'list__span';
    itemSpan.textContent = el.item;
    li.appendChild(itemSpan);

    const amountSpan = document.createElement('span');
    amountSpan.className = 'list__span';
    amountSpan.textContent = el.amount;
    li.appendChild(amountSpan);

    const buttonSpan = document.createElement('span');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'list__btn';
    const deleteImage = document.createElement('img');
    deleteImage.className = 'list__img';
    deleteImage.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png';
    deleteImage.alt = '';
    deleteButton.appendChild(deleteImage);
    buttonSpan.appendChild(deleteButton);
    li.appendChild(buttonSpan);

    fragment.appendChild(li);
    id++;
  });

  listUl.appendChild(fragment);
}



// function displayList(){
//     listUl.innerHTML = '';
//     id = 0
//     storedData.map(el=>{
//         listUl.innerHTML +=`<li class='li_item' id='${id}'><span class='list__span'>${el.item}</span><span class='list__span'>${el.amount}</span><span><button class="list__btn"><img class="list__img" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt=""></button></span></li>`
//         id++;
//     })
// }


function showExpenses(){
    if(expenseInput.value != '' && isNaN(expenseInput.value) && amountInput.value > 0 && amountInput.value != '' && !isNaN(amountInput.value) && fillBudget){
        let num = parseInt(amountInput.value)
        const newExpense = new Expense(expenseInput.value,num);
        storedData.push(newExpense)
        calcExpenses(storedData);
        calcBalance(budget,expenses)
        showData(expenses,balance)
        displayList()
        localStorage.setItem("expenses", JSON.stringify(storedData));
        expenseForm.reset()
    }else{
        secondError.classList.remove('hidden')
        setTimeout(()=>{
            secondError.classList.add('hidden')
        },3000)
        expenseForm.reset()
    }
}

// delete event

let getEl;


function confirmated(){
    expenses -= storedData[getEl].amount
    calcBalance(budget,expenses) 
    storedData.splice(getEl,1)
    localStorage.setItem("expenses", JSON.stringify(storedData));
    calcExpenses(storedData)
    showData(expenses,balance)
    displayList()
}

listUl.addEventListener('click',(e)=>{
    if(e.target.classList.contains('list__img')){
        getEl = e.target.parentElement.parentElement.parentElement.id
        document.querySelector('.deleteModal').style.display = 'flex';
    }
})


confirm.addEventListener('click',()=>{
    confirmated()
    document.querySelector('.deleteModal').style.display = 'none'
})

cancel.addEventListener('click',()=>{
    document.querySelector('.deleteModal').style.display = 'none'
});


// buttons events 


budgetSubmit.addEventListener('click',calcBudget);
expenseSubmit.addEventListener('click',showExpenses)
restart.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();
})


