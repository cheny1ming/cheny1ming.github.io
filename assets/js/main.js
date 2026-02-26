document.addEventListener('DOMContentLoaded', () => {
  // 初始化控制按钮（即使语言没加载完也能点）
  initThemeToggle();
  initLangToggle();
  initSmoothScroll();
  initMobileMenu();
});

// 监听语言加载完成事件 (核心：渲染所有内容)
window.addEventListener('i18nLoaded', () => {
  console.log('[main] i18n loaded, rendering content...');
  renderAbout();
  renderEducation();
  renderExperience();
  renderProjects();
  renderPublications();

  // 更新所有语言切换按钮文本
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.textContent = window.i18n.currentLang() === 'en' ? '中' : 'EN';
  });
});

// ================= 主题切换 =================
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle');
  const htmlEl = document.documentElement;

  if (toggleBtns.length === 0) return;

  // 兼容旧的 darkMode 和新的 theme 键
  let savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    const oldDarkMode = localStorage.getItem('darkMode');
    if (oldDarkMode === 'true') savedTheme = 'dark';
    else if (oldDarkMode === 'false') savedTheme = 'light';
  }
  savedTheme = savedTheme || 'light';

  htmlEl.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'dark') htmlEl.classList.add('dark');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      // 清除旧的 darkMode 键，避免混淆
      localStorage.removeItem('darkMode');
      if (newTheme === 'dark') htmlEl.classList.add('dark');
      else htmlEl.classList.remove('dark');
    });
  });
}

// ================= 语言切换 =================
function initLangToggle() {
  const toggleBtns = document.querySelectorAll('.lang-toggle');
  if (toggleBtns.length === 0) return;

  toggleBtns.forEach(btn => {
    btn.textContent = window.i18n.currentLang() === 'en' ? '中' : 'EN';
    btn.addEventListener('click', () => {
      const current = window.i18n.currentLang();
      const next = current === 'en' ? 'zh' : 'en';
      window.i18n.changeLang(next);
    });
  });
}

// ================= 平滑滚动 =================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ================= 移动端菜单 =================
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ================= About Section =================
function renderAbout() {
  const container = document.getElementById('about-container');
  if (!container) return;

  const about = window.i18n.get('about');

  container.innerHTML = `
    <div class="w-44 h-44 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-1.5 shadow-2xl shrink-0">
      <img src="./assets/images/head portrait.png" alt="Yiming Chen" class="w-full h-full rounded-full object-cover border-4 border-white dark:border-darkBg">
    </div>
    <div class="flex-1 text-center md:text-left">
      <h1 class="text-4xl font-extrabold mb-4 tracking-tight">${about.name_full}</h1>
      <div class="text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
        <p class="text-justify leading-8">${about.title}</p>
      </div>
      <div class="flex justify-center md:justify-start space-x-6 mt-8 text-2xl text-gray-400">
        <a href="https://github.com/cheny1ming" class="hover:text-black dark:hover:text-white transition"><i class="fa-brands fa-github"></i></a>
        <a href="https://space.bilibili.com/597870876?spm_id_from=333.1007.0.0" class="hover:text-blue-400 transition"><i class="fa-brands fa-bilibili"></i></a>
        <a href="https://www.zhihu.com/people/ren-sheng-bu-jiu-tu-ge-cheng-guo-yao" class="hover:text-blue-600 transition"><i class="fa-brands fa-zhihu"></i></a>
        <a href="mailto:yimingchen28@163.com" class="hover:text-red-500 transition"><i class="fa-solid fa-envelope"></i></a>
      </div>
    </div>
  `;
}

// ================= Education Section =================
function renderEducation() {
  const container = document.getElementById('education-container');
  if (!container) return;

  const edu = window.i18n.get('education');

  container.innerHTML = `
    <section id="education">
      <h2 class="text-2xl font-bold mb-10 flex items-center border-l-4 border-blue-500 pl-4">${edu.title}</h2>
      <div class="timeline-container space-y-16">
        <div class="relative">
          <div class="timeline-dot"></div>
          <div class="text-sm font-mono text-gray-500 mb-4 tracking-wide">${edu.item1.period}</div>
          <div class="flex flex-row items-center gap-8">
            <div class="w-48 shrink-0 flex justify-center">
              <img src="./assets/images/Polyu.png" class="max-h-24 w-auto object-contain transition-transform duration-300 hover:scale-105" alt="PolyU Logo">
            </div>
            <div class="flex-1 space-y-1">
              <h3 class="font-bold text-xl text-gray-900 dark:text-gray-100">${edu.item1.school}</h3>
              <p class="text-blue-600 dark:text-blue-400 font-medium">
                ${edu.item1.degree}
                <a href="https://www.polyu.edu.hk/comp/" target="_blank" rel="noopener noreferrer" class="hover:text-blue-800 dark:hover:text-blue-300 underline-offset-2 hover:underline transition">
                  ${edu.item1.department}
                </a>${edu.item1.degreeEnd}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <i class="fa-solid fa-medal mr-1 text-orange-400"></i>${edu.item1.honor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ================= Experience Section =================
function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  const exp = window.i18n.get('experience');

  container.innerHTML = `
    <section id="experience">
      <h2 class="text-2xl font-bold mb-10 flex items-center border-l-4 border-green-500 pl-4">${exp.title}</h2>
      <div class="timeline-container space-y-16">
        <div class="relative">
          <div class="timeline-dot timeline-dot-green"></div>
          <div class="text-sm font-mono text-gray-500 mb-4 tracking-wide">${exp.item1.period}</div>
          <div class="flex flex-row items-center gap-8">
            <div class="w-48 shrink-0 flex justify-center">
              <img src="./assets/images/Polyu.png" class="max-h-24 w-auto object-contain" alt="PolyU Logo">
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-xl text-gray-900 dark:text-gray-100 mb-1">
                <a href="https://polysmartgroup.github.io/" target="_blank" rel="noopener noreferrer" class="hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  ${exp.item1.company}
                </a>
              </h3>
              <p class="text-green-600 dark:text-green-400 font-medium text-sm mb-4">${exp.item1.position}</p>
              <ul class="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                ${exp.item1.tasks.map(task => `
                  <li class="flex gap-2">
                    <span class="text-blue-500">•</span>
                    <span>
                      <strong class="text-gray-800 dark:text-gray-100">${task.title}</strong>
                      ${task.desc}
                    </span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ================= Projects Section =================
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const projects = window.i18n.get('projects');

  let projectsHTML = `
    <section id="projects">
      <h2 class="text-2xl font-bold mb-10 flex items-center border-l-4 border-purple-500 pl-4">${projects.title}</h2>
      <div class="space-y-10">
  `;

  const projectItems = [
    { key: 'item1', icon: 'fa-map-location-dot', tech: 'MLLM + Geolocation', color: 'blue' },
    { key: 'item2', icon: 'fa-shield-halved', tech: 'MLLM + Safety Moderation', color: 'red' }
  ];

  projectItems.forEach(p => {
    const project = projects[p.key];
    const tags = project.tags;

    projectsHTML += `
      <div class="group flex flex-col md:flex-row rounded-3xl overflow-hidden border dark:border-gray-800 hover:shadow-2xl transition duration-300">
        <div class="md:w-1/3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
          <div class="text-center">
            <i class="fa-solid ${p.icon} text-6xl text-${p.color}-500 mb-4"></i>
            <p class="text-xs font-mono text-gray-400">${p.tech}</p>
          </div>
        </div>
        <div class="p-8 md:w-2/3 bg-white dark:bg-darkCard">
          <h3 class="text-xl font-bold mb-3 group-hover:text-${p.color}-500 transition">${project.title}</h3>
          <p class="text-sm text-gray-500 mb-4 leading-relaxed">${project.description}</p>
          <ul class="text-xs space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            ${project.points.map(point => `<li>${point}</li>`).join('')}
          </ul>
          <div class="flex flex-wrap gap-2">
            ${tags.map(tag => {
              const tagColors = {
                'Qwen2.5-VL': 'blue',
                'DeepSpeed': 'purple',
                'A100 * 4': 'green',
                'GRPO RL': 'red',
                'InternVL / GLM-4v': 'orange',
                'Data Engineering': 'indigo'
              };
              const tc = tagColors[tag] || 'gray';
              return `<span class="px-3 py-1 bg-${tc}-50 dark:bg-${tc}-900/20 text-${tc}-600 text-xs rounded-full">${tag}</span>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  });

  projectsHTML += `</div></section>`;
  container.innerHTML = projectsHTML;
}

// ================= Publications Section =================
function renderPublications() {
  const container = document.getElementById('publications-container');
  if (!container) return;

  const pub = window.i18n.get('publications');

  container.innerHTML = `
    <section id="publications">
      <h2 class="text-2xl font-bold mb-10 flex items-center border-l-4 border-orange-500 pl-4">${pub.title}</h2>
      <div class="bg-gray-50 dark:bg-darkCard/50 p-8 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 mb-4">
          <i class="fa-solid fa-feather-pointed text-xl"></i>
        </div>
        <p class="text-lg font-medium text-gray-700 dark:text-gray-300">${pub.comingSoon}</p>
        <p class="text-sm text-gray-500 mt-2">${pub.focus}</p>
      </div>
    </section>
  `;
}
