const user = JSON.parse(localStorage.getItem("user") || "null");
if (!user) {
  window.location.href = "login.html";
}

document.getElementById("userBadge").innerHTML = `
  <img src="${user.picture}" alt="">
  <span>${user.name}</span>
  <button id="logoutBtn">Sign out</button>`;
document.getElementById("logoutBtn").addEventListener("click", ()=>{
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

let transactions = [];
let selectedType = "expense";
let chart, trendChart;
const storageKey = "transactions_" + user.email; 

const todayStr = new Date().toISOString().slice(0,10);   
const monthStr = todayStr.slice(0,7);                     


let filterMode = "all";     
let filterDate = todayStr;
let filterMonth = monthStr;

document.getElementById("today").textContent = new Date().toLocaleDateString(undefined,{weekday:"long", month:"long", day:"numeric"});
document.getElementById("txDate").value = todayStr;   
document.getElementById("dayPicker").value = todayStr;
document.getElementById("monthPicker").value = monthStr;


document.querySelectorAll(".filter-bar button").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".filter-bar button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    filterMode = btn.dataset.filter;

    document.getElementById("dayPicker").style.display = filterMode==="day" ? "inline-block" : "none";
    document.getElementById("monthPicker").style.display = filterMode==="month" ? "inline-block" : "none";
    render();
  });
});
document.getElementById("dayPicker").addEventListener("change", e=>{ filterDate = e.target.value; render(); });
document.getElementById("monthPicker").addEventListener("change", e=>{ filterMonth = e.target.value; render(); });


function getFilteredTransactions(){
  if(filterMode==="day")   return transactions.filter(t=>t.date===filterDate);
  if(filterMode==="month") return transactions.filter(t=>t.date.slice(0,7)===filterMonth);
  return transactions;
}


function loadData(){
  const saved = localStorage.getItem(storageKey);
  transactions = saved ? JSON.parse(saved) : [];
  render();
}
function saveData(){
  localStorage.setItem(storageKey, JSON.stringify(transactions));
}


document.querySelectorAll(".toggle button").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".toggle button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    selectedType = btn.dataset.type;
  });
});

// ---------- add transaction ----------
document.getElementById("form").addEventListener("submit", e=>{
  e.preventDefault();
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("txDate").value || todayStr;
  if(!desc || !amount) return;

  transactions.unshift({
    id: Date.now(),
    desc, amount, category, type: selectedType, date
  });

  e.target.reset();
  document.getElementById("txDate").value = todayStr; 
  saveData();
  render();
});

function deleteTx(id){
  transactions = transactions.filter(t=>t.id!==id);
  saveData();
  render();
}


function render(){
  const income = transactions.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const expense = transactions.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
  document.getElementById("balance").textContent = "₹" + (income-expense).toLocaleString();
  document.getElementById("totalIncome").textContent = "₹" + income.toLocaleString();
  document.getElementById("totalExpense").textContent = "₹" + expense.toLocaleString();

  const filtered = getFilteredTransactions();
  const fIncome = filtered.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const fExpense = filtered.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
  const periodLabel = filterMode==="day" ? filterDate : filterMode==="month" ? filterMonth : "all time";
  document.getElementById("periodStats").textContent =
    `Showing ${periodLabel} · Income ₹${fIncome.toLocaleString()} · Expense ₹${fExpense.toLocaleString()}`;

  const list = document.getElementById("txList");
  list.innerHTML = "";
  if(filtered.length===0){
    list.innerHTML = '<div class="empty">No transactions for this period.</div>';
  }
  filtered.slice(0,50).forEach(t=>{
    const row = document.createElement("div");
    row.className = "tx";
    row.innerHTML = `
      <div>
        <div>${t.desc}</div>
        <div class="meta">${t.category} · ${t.date}</div>
      </div>
      <div>
        <span class="amt ${t.type}">${t.type==="income"?"+":"-"}₹${t.amount.toLocaleString()}</span>
        <button onclick="deleteTx(${t.id})">✕</button>
      </div>`;
    list.appendChild(row);
  });

  renderChart(filtered);
  renderTrend();
}

function renderChart(list){
  const byCat = {};
  list.filter(t=>t.type==="expense").forEach(t=>{
    byCat[t.category] = (byCat[t.category]||0) + t.amount;
  });
  const labels = Object.keys(byCat);
  const data = Object.values(byCat);

  if(chart) chart.destroy();
  chart = new Chart(document.getElementById("chart"), {
    type:"doughnut",
    data:{ labels, datasets:[{ data, backgroundColor:["#2f6f4e","#b5502e","#d9a441","#4c7ab5","#8a5cb5","#7a7e74","#c9c3b3"] }]},
    options:{ plugins:{ legend:{ labels:{ color:"#1f2420" } } } }
  });
}
function renderTrend(){
  const month = filterMode==="month" ? filterMonth : monthStr;
  document.getElementById("trendLabel").textContent = "· " + month;

  const [y, m] = month.split("-").map(Number);
  const daysInMonth = new Date(y, m, 0).getDate();
  const totals = Array(daysInMonth).fill(0);

  transactions
    .filter(t => t.type==="expense" && t.date.slice(0,7)===month)
    .forEach(t => { totals[parseInt(t.date.slice(8,10),10) - 1] += t.amount; });

  if(trendChart) trendChart.destroy();
  trendChart = new Chart(document.getElementById("trendChart"), {
    type:"bar",
    data:{ labels: totals.map((_,i)=>i+1), datasets:[{ label:"Expense", data: totals, backgroundColor:"#b5502e" }] },
    options:{ plugins:{ legend:{ display:false } },
              scales:{ x:{ ticks:{ color:"#7a7e74" } }, y:{ ticks:{ color:"#7a7e74" } } } }
  });
}

loadData();
