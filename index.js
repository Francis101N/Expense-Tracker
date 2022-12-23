const balance = document.querySelector("#balance");
const totalIncomeText = document.querySelector(".total-income");
const totalExpenseText = document.querySelector(".total-expense");
const list = document.querySelector(".list");

const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount"); 

const localStorageTransactions = JSON.parse(localStorage.getItem("expense-app"))

let transactions = localStorage.getItem("expense-app") === null ? [] : localStorageTransactions;

form.addEventListener("submit", addTransaction);

updateDOM()

function addTransaction(e){ 
   e.preventDefault();

   if(description.value.trim() === "" || amount.value.trim() ===""){
    alert("Description and Amount cannot be empty")
   }else{
      const transaction ={
        id:Math.floor(Math.random()*100000000),
        desc: description.value,
        amount: +amount.value,
      };
      transactions.push(transaction);

      updateLocalStorage()

       addTransactionToDom(transaction)

       updateValues()

       description.value =""
       amount.value =""
   }
}

function addTransactionToDom(transaction){
    const item = document.createElement("li")
      let sign = "";
      if(transaction.amount <0){
        sign = "-"
        item.classList.add("minus")
      } else{
        sign ="+"
        item.classList.add("plus")
      }
    //   TENARY OPERATOR
    // transaction.amount<0 ? sign = "-": sign="+"
       
     item.innerHTML=`<button onclick="removeTransaction(${transaction.id})" class="delete-btn">X</button> ${transaction.desc}<span>${sign}${Math.abs(transaction.amount)}</span>`;
  
     list.appendChild(item)
}

function updateValues(){
    const amounts = transactions.map((transaction)=>{
        return transaction.amount;
    })
    
    const total = amounts.reduce((totalValue,currValue)=>{
      return (totalValue += currValue);
    },0).toFixed(2)

    // console.log(total)

    const totalIncome = amounts.filter((amount)=>{
      return amount > 0
    }).reduce((incomeBal, currValue)=>{
      return (incomeBal += currValue)
    },0)

    const totalExpense = amounts.filter((amount)=>{
        return amount < 0
    }).reduce((expenseBal,currValue)=>{
      return(expenseBal += Math.abs(currValue))
    },0).toFixed(2)

    totalExpenseText.innerHTML = totalExpense

    totalIncomeText.innerHTML = totalIncome

    balance.innerHTML = total;

}

function removeTransaction(transactionId){
  //  console.log(transactionid)
  transactions = transactions.filter((transaction)=>{
    return transaction.id !== transactionId;
  })
   
  updateLocalStorage()
  updateDOM()
}


function updateDOM(){
  list.innerHTML = ""
  transactions.forEach(addTransactionToDom)
  updateValues()
}

 function updateLocalStorage(){
   localStorage.setItem("expense-app",JSON.stringify(transactions))
 }