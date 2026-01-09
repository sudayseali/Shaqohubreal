    // 1. Habaynta Supabase
    const SB_URL = 'https://hqyayioenlteotepgujs.supabase.co';
    const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeWF5aW9lbmx0ZW90ZXBndWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1Njg0OTQsImV4cCI6MjA4MjE0NDQ5NH0.QIt-9r-5aCYEkDfDy-auZxyAMfPv_UqIWJZs2drw5MU';
    
    let sbClient;
    try {
        // Waxaan hubineynaa in Library-gu uu load noqday
        if (typeof supabase !== 'undefined') {
            sbClient = supabase.createClient(SB_URL, SB_KEY);
        } else {
            console.error("Supabase library lama helin! Hubi CDN-ka.");
        }
    } catch (e) {
        console.error("Cilad dhanka Supabase Client ah:", e);
    }
    
    let allTasks = [];
    
    // 2. Navigation Function (Muhiim u ah in badhamadu shaqeeyaan)
    function activateNav(element, sectionId) {
        // Qari dhamaan sections-ka
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        // Soo bandhig kan la doonayo
        document.getElementById(sectionId).classList.remove('hidden');
        
        // Midabka badhamada hoose
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('text-indigo-600', 'active');
            nav.classList.add('text-gray-400');
        });
        element.classList.add('text-indigo-600', 'active');
        element.classList.remove('text-gray-400');
    }
    
    function navigateToSection(sectionId) {
        const navItem = document.querySelector(`a[href="#${sectionId}"]`);
        if (navItem) activateNav(navItem, sectionId);
    }
    
    // 3. Keenista Xogta
    async function loadData() {
        if (!sbClient) return;
        try {
            const { data: categories, error: catErr } = await sbClient.from('categories').select('*');
            if (categories) renderCategories(categories);
            
            const { data: tasks, error: taskErr } = await sbClient.from('tasks').select('*');
            if (tasks) {
                allTasks = tasks;
                renderTasks(tasks);
            }
        } catch (err) {
            console.error("Cilad xogta ah:", err.message);
        }
    }
    
    // 4. Render Functions (Waxay wataan Modal Action)
    function renderCategories(categories) {
        const container = document.getElementById('categoriesContainer');
        if (!container) return;
        container.innerHTML = categories.map(cat => `
            <div class="snap-center shrink-0 flex flex-col items-center cursor-pointer">
                <div class="w-16 h-16 rounded-2xl ${cat.color || 'bg-indigo-100'} flex items-center justify-center shadow-sm mb-2">
                    <i class="${cat.icon || 'fas fa-briefcase'} text-xl text-indigo-600"></i>
                </div>
                <span class="text-xs font-medium text-gray-600 dark:text-gray-300">${cat.name}</span>
            </div>
        `).join('');
    }
    
    function renderTasks(tasks) {
        const container = document.getElementById('tasksContainer');
        const allContainer = document.getElementById('allTasksContainer');
        if (!container) return;
        
        const html = tasks.map(task => `
            <div class="bg-white dark:bg-darkCard rounded-3xl p-3 shadow-sm mb-4 cursor-pointer" onclick='openModal(${JSON.stringify(task).replace(/'/g, "&apos;")})'>
                <div class="relative h-48 w-full rounded-2xl overflow-hidden mb-3">
                    <img src="${task.image}" class="w-full h-full object-cover">
                </div>
                <div class="px-2">
                    <h3 class="font-bold text-gray-800 dark:text-white text-lg">${task.title}</h3>
                    <p class="text-indigo-600 font-bold">${task.earnings}</p>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = html;
        if (allContainer) allContainer.innerHTML = html;
    }
    
    // 5. Modal & Dark Mode
    function openModal(task) {
        document.getElementById('modalImage').src = task.image;
        document.getElementById('modalTitle').innerText = task.title;
        document.getElementById('modalEarnings').innerText = task.earnings;
        document.getElementById('modalWebsite').innerText = task.website || 'Online';
        document.getElementById('modalDescription').innerText = task.description || '';
        document.getElementById('modalLink').href = task.url || '#';
        document.getElementById('taskDetailModal').classList.remove('hidden');
    }
    
    document.getElementById('closeModal').onclick = () => {
        document.getElementById('taskDetailModal').classList.add('hidden');
    };
    
    function toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
    }
    
    function showInfo(type) {
        const titles = {
            mission: 'Ujeeddada (Mission)',
            privacy: 'Privacy Policy',
            terms: 'Terms & Conditions'
        };
        
        const contents = {
            mission: `
ShaqoHub waxa uu caawiyaa dhalinyarada Soomaaliyeed si ay u helaan
fursado shaqo online ah. Waxaan isku xirnaa dadka iyo bogagga shaqo ee
la hubo, waxaanan ka digaynaa khiyaanada & scam-ka.
`,
            privacy: `
Waxaan ururinaa xog aad u yar (cookies / usage data) si app-ku u
shaqeeyo. KUMA ururinno xog gaar ah oo kuu muuqata sida email ama
telefoon. Xogta waxaa loo isticmaalaa kaliya kor u qaadida adeegga.
`,
            terms: `
Adeegga waxaad u isticmaashaa kaliya si sharci ah.
Macluumaadka ku jira app-kan waa talo guud — had iyo jeer hubi bogga
rasmiga ah ka hor intaadan go'aan gaarin. Haddii aad jebiso shuruudaha,
waxaan xaq u leenahay inaan xaddidno isticmaalka.
`
        };
        
        // Cinwaan
        document.getElementById('infoTitle').innerText = titles[type] || '';
        
        // Qoraal
        document.getElementById('infoContent').innerText = contents[type] || '';
        
        // Modal show
        document.getElementById('infoModal').classList.remove('hidden');
    }
    
    // Bilowga
    document.addEventListener('DOMContentLoaded', loadData);