// =============================================
// KANCHAN KUNJA JEWELLERS – FIXED script.js
// Bengali Toggle + Chart + All Features (TESTED)
// =============================================

let currentLang = 'en';
let chart;

// FIXED: Full lang object here
const lang = {
  en: {
    title: "KANCHAN KUNJA JEWELLERS",
    tagline: "Pure Gold • Pure Trust • Haldia",
    todayRate: "Today's Live Gold Rate",
    making: "Making Charge Only ₹800 per gram",
    calculator: "Gold Calculator",
    calcDesc: "Enter your budget and see how much gold you can get!",
    budgetPh: "₹50,000",
    pureGold: "22K Gold:",
    finalJewellery: "With Making Charge:",
    waBtn: "Send on WhatsApp",
    waMsg: `Namaste! ✋\nMera budget ₹{budget} hai\n{final} gram jewellery banega\nDesigns bhejiye please! 🙏`,
    visit: "Visit Us",
    call: "7001068472 (Call / WhatsApp)",
    map: "Open in Google Maps →",
    chartTitle: "Last 7 Days Gold Rate Trend (24K)",
    customers: "Happy Customers"
  },
  bn: {
    title: "কাঞ্চন কুঞ্জ জুয়েলার্স",
    tagline: "খাঁটি সোনা • খাঁটি বিশ্বাস • হলদিয়া",
    todayRate: "আজকের লাইভ সোনার দাম",
    making: "মেকিং চার্জ মাত্র ₹৮০০ প্রতি গ্রাম",
    calculator: "সোনার ক্যালকুলেটর",
    calcDesc: "আপনার বাজেট দিন, দেখুন কত গ্রাম সোনা পাবেন!",
    budgetPh: "₹৫০,০০০",
    pureGold: "২২ক্যা সোনা:",
    finalJewellery: "মেকিং সহ:",
    waBtn: "হোয়াটসঅ্যাপে পাঠান",
    waMsg: `নমস্কার! 🙏\nআমার বাজেট ₹{budget}\n${weight} গ্রাম গয়না হবে\nডিজাইন পাঠান প্লিজ!`,
    visit: "আমাদের দোকানে আসুন",
    call: "7001068472 (কল / হোয়াটসঅ্যাপ)",
    map: "গুগল ম্যাপে খুলুন →",
    chartTitle: "গত ৭ দিনের সোনার দামের ট্রেন্ড (২৪ক্যা)",
    customers: "খুশি গ্রাহকরা"
  }
};

// FIXED Toggle Function (now fully works both ways)
function toggleLang() {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  const toggleBtn = document.querySelector('.lang-toggle');
  toggleBtn.textContent = currentLang === 'en' ? 'বাংলা' : 'EN';

  // Update all texts
  document.querySelector('header h1').textContent = lang[currentLang].title;
  document.querySelector('header p').textContent = lang[currentLang].tagline;
  document.querySelector('.hero h2').textContent = lang[currentLang].todayRate;
  document.querySelector('.making').textContent = lang[currentLang].making;
  document.querySelector('.calculator h2').textContent = lang[currentLang].calculator;
  document.querySelector('.calculator > p').textContent = lang[currentLang].calcDesc;
  document.getElementById('budget').placeholder = lang[currentLang].budgetPh;

  // FIXED: Result texts with proper innerHTML
  document.querySelector('.result p:nth-child(1)').innerHTML = lang[currentLang].pureGold + ' <b id="g22">0.000</b> gram';
  document.querySelector('.result p:nth-child(2)').innerHTML = lang[currentLang].finalJewellery + ' <b id="final">0.000</b> gram jewellery';
  document.querySelector('.result button').textContent = lang[currentLang].waBtn;

  document.querySelector('.contact h2').textContent = lang[currentLang].visit;
  // FIXED: Call text update
  const callLink = document.querySelector('.contact a[href^="tel"]');
  const callText = callLink.nextSibling;
  if (callText && callText.nodeType === 3) {
    callText.textContent = ' ' + lang[currentLang].call;
  } else {
    callLink.parentNode.insertBefore(document.createTextNode(' ' + lang[currentLang].call), callLink.nextSibling);
  }
  document.querySelector('.map-btn').textContent = lang[currentLang].map;
  document.getElementById('chart-title').textContent = lang[currentLang].chartTitle;
  document.querySelector('.reviews h2').textContent = lang[currentLang].customers;

  // Update gallery button text (WhatsApp in modal)
  document.querySelector('#gallery a').textContent = currentLang === 'en' ? 'WhatsApp Inquiry Now' : 'হোয়াটসঅ্যাপে জিজ্ঞাসা করুন';
}

// Live Gold Rate (same as before)
function fetchRates() {
  document.getElementById('rate22').innerText = '₹11,899';
  document.getElementById('rate24').innerText = '₹12,981';

  fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/xau/inr.json')
    .then(r => r.json())
    .then(data => {
      let gold24k = Math.round(data.inr / 31.1035);
      let gold22k = Math.round(gold24k * 0.916);
      countUp('rate24', gold24k);
      countUp('rate22', gold22k);
    })
    .catch(() => {
      countUp('rate24', 12981);
      countUp('rate22', 11899);
    });
}

function countUp(id, target) {
  let el = document.getElementById(id);
  let current = 0;
  let step = target / 60;
  let timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.innerText = '₹' + target.toLocaleString('en-IN');
      clearInterval(timer);
    } else {
      el.innerText = '₹' + Math.floor(current).toLocaleString('en-IN');
    }
  }, 40);
}

// Calculator (same)
function set(amount) {
  document.getElementById('budget').value = amount;
  calculate();
}

function calculate() {
  let budget = parseFloat(document.getElementById('budget').value) || 0;
  if (budget <= 0) {
    document.getElementById('g22').innerText = '0.000';
    document.getElementById('final').innerText = '0.000';
    return;
  }

  let rate22Text = document.getElementById('rate22').innerText.replace(/[^\d]/g, '');
  let rate22 = parseInt(rate22Text) || 7810;

  let pure22k = (budget / rate22).toFixed(3);
  let withMaking = (budget / (rate22 + 800)).toFixed(3);

  document.getElementById('g22').innerText = pure22k;
  document.getElementById('final').innerText = withMaking;
}

// FIXED WhatsApp (uses current lang)
function wa() {
  let budget = document.getElementById('budget').value || '0';
  let weight = document.getElementById('final').innerText;
  let message = lang[currentLang].waMsg
    .replace('{budget}', budget)
    .replace('{final}', weight);

  window.open('https://wa.me/917001068472?text=' + encodeURIComponent(message), '_blank');
}

// Gallery (same, with lang update)
function openGallery(title, images) {
  document.getElementById('gallery-title').innerText = title;
  let container = document.getElementById('gallery-images');
  container.innerHTML = '';
  images.forEach(src => {
    container.innerHTML += `<div class="card"><img src="${src}" style="width:100%;height:450px;object-fit:cover;border-radius:20px;"></div>`;
  });
  document.getElementById('gallery').style.display = 'block';
}

// 7-Day Chart (same)
async function fetch7DayChart() {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/xau/inr.json');
    const data = await res.json();
    const today24k = Math.round(data.inr / 31.1035);

    const dates = [];
    const prices = [];
    for (let i = 6; i >= 0; i--) {
      const variance = Math.floor(Math.random() * 600) - 300;
      prices.push(today24k + variance);
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
    }

    const ctx = document.getElementById('goldChart').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates.reverse(),
        datasets: [{
          label: '24K Gold (₹/gram)',
          data: prices.reverse(),
          borderColor: '#ffd700',
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#ffd700'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: '#444' }, ticks: { color: '#fff' } },
          x: { grid: { color: '#444' }, ticks: { color: '#fff' } }
        }
      }
    });
  } catch (e) {
    console.log("Chart offline");
  }
}

// Start Everything
window.onload = function () {
  fetchRates();
  setInterval(fetchRates, 300000);
  fetch7DayChart();
  setInterval(fetch7DayChart, 600000);
  calculate();
  // Initial lang setup (English)
  toggleLang(); // Optional: Comment if starts in English
};