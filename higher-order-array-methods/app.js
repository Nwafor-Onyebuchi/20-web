const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaire = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculaeteWealthBtn = document.getElementById("calculate-wealth");

let data = [];

const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last} `,
    money: Math.floor(Math.random() * 1000000),
  };

  addUser(newUser);
};

//Double money
const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// Sort by richest
const sortPeople = () => {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
};

// Show millionaires
const showMillionaires = () => {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
};

const addUser = (obj) => {
  data.push(obj);
  updateDOM();
};

// Calculate wealth
const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  console.log(wealth);
  wealthEl.innerHTML = `<h3><strong>${formatMoney(wealth)}</strong></h3>`;

  main.append(wealthEl);
};

const updateDOM = (providedData = data) => {
  main.innerHTML = ` <h2><strong>Person</strong>Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
};

// Format money
const formatMoney = (number) => {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
};

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortPeople);
showMillionaire.addEventListener("click", showMillionaires);
calculaeteWealthBtn.addEventListener("click", calculateWealth);

getRandomUser();
