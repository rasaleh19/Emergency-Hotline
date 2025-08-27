// Emergency services data
const services = [
  {
    name: "National Emergency Number",
    type: "National Emergency",
    number: "999",
    icon: "assets/emergency.png",
    tag: "All",
  },
  {
    name: "Police Helpline Number",
    type: "Police",
    number: "999",
    icon: "assets/police.png",
    tag: "Police",
  },
  {
    name: "Fire Service Number",
    type: "Fire Service",
    number: "999",
    icon: "assets/fire-service.png",
    tag: "Fire",
  },
  {
    name: "Ambulance Service",
    type: "Ambulance",
    number: "1994-999999",
    icon: "assets/ambulance.png",
    tag: "Health",
  },
  {
    name: "Women & Child Helpline",
    type: "Women & Child Helpline",
    number: "109",
    icon: "assets/emergency.png",
    tag: "Help",
  },
  {
    name: "Anti-Corruption Helpline",
    type: "Anti-Corruption",
    number: "106",
    icon: "assets/emergency.png",
    tag: "Govt.",
  },
  {
    name: "Electricity Helpline",
    type: "Electricity Outage",
    number: "16216",
    icon: "assets/emergency.png",
    tag: "Electricity",
  },
  {
    name: "Brac Helpline",
    type: "Brac",
    number: "16445",
    icon: "assets/brac.png",
    tag: "NGO",
  },
  {
    name: "Bangladesh Railway Helpline",
    type: "Bangladesh Railway",
    number: "163",
    icon: "assets/Bangladesh-Railway.png",
    tag: "Travel",
  },
];

// State
let favs = [];
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

// Render service cards

function renderCards() {
  const section = document.getElementById("serviceCards");
  section.innerHTML = services
    .map(
      (s, i) => `
    <div class="card bg-white shadow rounded-xl p-4 relative flex flex-col">
      <div class="flex items-center mb-2 relative">
        <img src="${s.icon}" class="w-8 h-8"/>
        <span class="badge badge-outline ml-2">${s.tag}</span>
        <button onclick="toggleFav(${i})"
                class="absolute top-0 right-0"
                style="background:transparent;border:none;padding:0;">
          <img src="assets/heart.png"
               id="fav${i}"
               class="w-6 h-6 transition-all ${
                 favs.includes(i) ? "" : "grayscale"
               }"
               alt="heart" />
        </button>
      </div>
      <h3 class="font-bold text-lg">${s.name}</h3>
      <p class="text-sm text-gray-500 mb-2">${s.type}</p>
      <div class="text-2xl font-bold mb-2">${s.number}</div>
      <div class="flex gap-2 mt-auto">
        <button class="btn btn-xs btn-outline flex items-center gap-1" onclick="copyNumber('${
          s.number
        }')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m-8-4h8M4 6h16"/></svg>
          Copy
        </button>
        <button class="btn btn-xs btn-success flex items-center gap-1" onclick="callService('${
          s.name
        }','${s.number}',${i})">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2-2v1.382a2 2 0 00.447 1.342L9 10m6 0v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4m6 0h2a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4"/></svg>
          Call
        </button>
      </div>
    </div>
  `
    )
    .slice(0, 6)
    .join("");
}

// Render call history
function renderHistory() {
  const ul = document.getElementById("callHistory");
  ul.innerHTML = callHistory
    .map(
      (h) => `
    <li class="border-b pb-2">
      <b>${h.name}</b><br>
      ${h.number}<br>
      <span class="text-xs text-gray-400">${h.time}</span>
    </li>
  `
    )
    .join("");
}

// Heart icon logic
function toggleFav(idx) {
  if (favs.includes(idx)) {
    favs = favs.filter((i) => i !== idx);
  } else {
    favs.push(idx);
  }
  document.getElementById("favCount").textContent = favs.length;
  renderCards();
}

// Copy logic
function copyNumber(num) {
  navigator.clipboard.writeText(num);
  copyCount++;
  document.getElementById("copyCount").textContent = copyCount;
  alert("Number copied: " + num);
}

// Call logic
function callService(name, number, idx) {
  if (coinCount < 20) {
    alert("Not enough coins to make a call!");
    return;
  }
  coinCount -= 20;
  document.getElementById("coinCount").textContent = coinCount;
  alert(`Calling ${name} at ${number}`);
  const time = new Date().toLocaleTimeString();
  callHistory.unshift({ name, number, time });
  renderHistory();
}

// Clear history
function clearHistory() {
  callHistory = [];
  renderHistory();
}

// Initial render
renderCards();
renderHistory();
