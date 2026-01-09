const translations = {
  so: {
    welcome: "Soo Dhawow!",
    greeting: "Subax wanaagsan,",
    search: "Raadi shaqooyin...",
    heroTitle: "Raadi Shaqooyin<br>Cusub Maanta",
    heroSub: "Hel shaqooyin internetka ah oo sugan, kana ilaalo kuwa khiyaanada ah.",
    startBtn: "Bilow Raadinta",
    home: "Hoyga",
    searchNav: "Raadi",
    account: "Koontada"
  },
  en: {
    welcome: "Welcome!",
    greeting: "Good morning,",
    search: "Search jobs...",
    heroTitle: "Find New<br>Jobs Today",
    heroSub: "Find secure online jobs and avoid scams.",
    startBtn: "Start Searching",
    home: "Home",
    searchNav: "Search",
    account: "Account"
  }
};

function changeLanguage(lang) {
  // 1. Beddel qoraallada muhiimka ah
  document.querySelector('h1').innerText = translations[lang].welcome;
  document.querySelector('p.text-gray-500.text-xs').innerText = translations[lang].greeting;
  document.getElementById('searchTasks').placeholder = translations[lang].search;
  document.querySelector('.hero-card h2').innerHTML = translations[lang].heroTitle;
  document.querySelector('.hero-card p').innerText = translations[lang].heroSub;
  
  // 2. Beddel qoraalka Menu-ga hoose
  const navItems = document.querySelectorAll('.nav-item span');
  navItems[0].innerText = translations[lang].home;
  navItems[1].innerText = translations[lang].searchNav;
  navItems[2].innerText = translations[lang].account;
  
  // 3. Beddel muuqaalka badhamada (Active state)
  const btnSo = document.getElementById('lang-so');
  const btnEn = document.getElementById('lang-en');
  
  if (lang === 'en') {
    btnEn.className = "px-3 py-1 rounded-md text-xs font-bold bg-white text-indigo-600 shadow-sm";
    btnSo.className = "px-3 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400";
    document.documentElement.lang = "en";
  } else {
    btnSo.className = "px-3 py-1 rounded-md text-xs font-bold bg-white text-indigo-600 shadow-sm";
    btnEn.className = "px-3 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400";
    document.documentElement.lang = "so";
  }
}