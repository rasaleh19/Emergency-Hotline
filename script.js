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
    <div class="card bg-white shadow rounded-xl p-4 relative flex flex-col w-full min-h-[220px]">
      <div class="flex items-center mb-2 relative">
        <img src="${s.icon}" class="w-8 h-8"/>
          <button onclick="toggleFav(${i})"
                class="absolute top-0 right-0"
                style="background:transparent;border:none;padding:0;">
          <i id="fav${i}" 
             class="${
               favs.includes(i)
                 ? "fa-solid fa-heart text-red-500"
                 : "fa-regular fa-heart text-black-500"
             } text-xl transition-all"></i>
        </button>
      </div>
      <h3 class="font-bold text-black text-lg">${s.name}</h3>
      <p class="text-sm text-gray-500 mb-2">${s.type}</p>
      <div class="text-2xl font-bold text-black mb-2">${s.number}</div>
      <div class="mb-2">
        <span class="badge badge-outline">${s.tag}</span>
      </div>
      <div class="flex gap-2 mt-auto">
        <button class="btn btn-xs btn-outline flex-1 flex items-center gap-1" onclick="copyNumber('${
          s.number
        }')">
          <i class="fa-regular fa-copy"></i>
          Copy
        </button>
        <button class="btn btn-xs btn-success flex-1 flex items-center gap-1 text-white" onclick="callService('${
          s.name
        }','${s.number}',${i})">
          <i class="fa-solid fa-phone"></i>
          Call
        </button>
      </div>
    </div>
  `
    )
    .slice(0)
    .join("");
}

// Render call history
function renderHistory() {
  const ul = document.getElementById("callHistory");
  ul.innerHTML = callHistory
    .map(
      (h) => `
    <li class="bg-gray-100 rounded-lg p-2 mb-2">
      <div class="flex justify-between">
        <span class="font-bold text-black">${h.name}</span>
        <span class="text-xs text-black">${h.time}</span>
      </div>
      <div class="text-black text-sm">${h.number}</div>
    </li>
  `
    )
    .join("");
}

// Heart icon logic
function toggleFav(idx) {
  const favIcon = document.getElementById("fav" + idx);

  if (favs.includes(idx)) {
    favs = favs.filter((i) => i !== idx);
    favIcon.className =
      "fa-regular fa-heart text-gray-600 text-xl transition-all";
  } else {
    favs.push(idx);
    favIcon.className = "fa-solid fa-heart text-red-500 text-xl transition-all";
  }

  document.getElementById("favCount").textContent = favs.length;
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
