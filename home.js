const facultyData = {
  csit: {
    name: "BSc CSIT",
    desc: "Computer Science & Information Technology",
    focus: "programming, algorithms, databases, networks and software systems",
  },
  bit: {
    name: "BIT",
    desc: "Bachelor of Information Technology",
    focus:
      "information systems, programming, databases, web technologies and IT management",
  },
  btech: {
    name: "B.Tech Food Technology",
    desc: "Food Technology",
    focus:
      "food chemistry, food microbiology, processing, preservation, quality and product development",
  },
  mtech: {
    name: "M.Tech Food Technology",
    desc: "Advanced Food Technology",
    focus:
      "advanced food engineering, processing, quality systems, research and product development",
  },
  bsc: {
    name: "B.Sc.",
    desc: "Science",
    focus:
      "physical and biological sciences, laboratory work and scientific reasoning",
  },
  microbiology: {
    name: "Microbiology",
    desc: "Microbial Science",
    focus:
      "microorganisms, laboratory methods, genetics, immunology and microbial ecology",
  },
  geology: {
    name: "Geology",
    desc: "Earth Science",
    focus:
      "minerals, rocks, tectonics, stratigraphy, geomorphology and Earth processes",
  },
};
const params = new URLSearchParams(location.search),
  key = params.get("faculty") || "csit",
  data = facultyData[key] || facultyData.csit;
const $ = (id) => document.getElementById(id);
if ($("year")) $("year").textContent = new Date().getFullYear();

const icons = {
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
  book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5zM4 5.5v16M8 7h8M8 11h8"/></svg>',
  pdf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6zM15 3v4h4M8 16h2.2a1.8 1.8 0 0 0 0-3.6H8v5.2M13 17.6v-5.2h3M13 15h2.4"/></svg>',
  youtube:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1L11 5M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1-1"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z" fill="currentColor" stroke="none"/></svg>',
  trophy:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v5a5 5 0 0 1-10 0zM12 14v5M8 20h8M4 5h3v3a3 3 0 0 1-3-3zM20 5h-3v3a3 3 0 0 0 3-3z"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
};
function icon(name) {
  return icons[name] || icons.arrow;
}

/* Mobile navigation: fixed full-screen sheet + backdrop, independent of header layout. */
const toggle = $("menuToggle"),
  menu = $("mobileMenu"),
  close = $("menuClose");
function closeMenu() {
  if (!menu) return;
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
  if (toggle) {
    toggle.classList.remove("active");
    toggle.classList.remove("hidden");
    toggle.setAttribute("aria-expanded", "false");
  }
}
function openMenu() {
  if (!menu) return;
  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
  if (toggle) {
    toggle.classList.add("active");
    toggle.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "true");
  }
}
if (toggle && menu) {
  toggle.innerHTML = icon("menu");
  toggle.addEventListener("click", () =>
    menu.classList.contains("open") ? closeMenu() : openMenu(),
  );
  close?.addEventListener("click", closeMenu);
  menu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  menu.addEventListener("click", (e) => {
    if (e.target === menu) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* Profile */
const profileKey = "cctBuzzProfile";
function getProfile() {
  try {
    return JSON.parse(localStorage.getItem(profileKey)) || null;
  } catch {
    return null;
  }
}
function openModal() {
  const m = $("profileModal");
  if (!m) return;
  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
  const p = getProfile();
  if (p) {
    $("profileFaculty").value = p.faculty || "";
    $("profileSemester").value = p.semester || "";
  }
}
function closeModal() {
  const m = $("profileModal");
  if (m) {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
  }
}
if ($("profileModal")) {
  $("modalClose")?.addEventListener("click", closeModal);
  document
    .querySelector(".modal-backdrop")
    ?.addEventListener("click", closeModal);
  $("saveProfile")?.addEventListener("click", () => {
    const f = $("profileFaculty").value,
      s = $("profileSemester").value;
    if (!f || !s) {
      $("saveNote").textContent =
        "Please choose both your faculty and year/semester.";
      return;
    }
    localStorage.setItem(
      profileKey,
      JSON.stringify({ faculty: f, semester: s }),
    );
    $("saveNote").textContent = "Saved — your CCT space is ready.";
    setTimeout(closeModal, 450);
  });
}
if ($("profileText")) {
  const p = getProfile();
  $("profileText").textContent = p
    ? `${facultyData[p.faculty]?.name || p.faculty} · ${p.semester}`
    : `${data.name} · profile not selected`;
  $(`changeProfile`)?.addEventListener("click", openModal);
}
if (
  $("profileModal") &&
  !getProfile() &&
  location.pathname.endsWith("index.html")
)
  setTimeout(openModal, 700);

const faqByFaculty = {
  csit: [
    [
      "What is BSc CSIT?",
      "It is a computer science and information technology programme. CCT's official site lists BSc CSIT among its academic offerings.",
    ],
    [
      "What should a CSIT student practise regularly?",
      "Programming, data structures, algorithms, databases, networking and problem solving are strong recurring areas for practice.",
    ],
    [
      "Where should official academic information be checked?",
      "Use CCT's official website for admission, examination, results and administrative notices; use CCT BUZZ as a student-resource layer.",
    ],
  ],
  bit: [
    [
      "What is BIT?",
      "BIT is the Bachelor of Information Technology programme listed by CCT.",
    ],
    [
      "What topics fit a BIT resource shelf?",
      "Programming, web development, databases, networking, information systems and software project work are useful starting categories.",
    ],
    [
      "Where can I verify BIT notices?",
      "Verify current admission, examination and administrative information through the official CCT website.",
    ],
  ],
  btech: [
    [
      "What is B.Tech Food Technology?",
      "CCT lists B.Tech Food Technology among its programmes and has a long-standing focus on food technology education.",
    ],
    [
      "What are useful study areas?",
      "Food chemistry, food microbiology, processing, preservation, quality control, packaging and product development are useful resource categories.",
    ],
    [
      "How should online resources be used?",
      "Use them to supplement lectures and laboratory work, and prefer authoritative textbooks, institutions and peer-reviewed material.",
    ],
  ],
  mtech: [
    [
      "What is M.Tech Food Technology?",
      "CCT's programme material lists M.Tech Food Technology among its postgraduate offerings.",
    ],
    [
      "What belongs in an advanced food-technology library?",
      "Process engineering, advanced processing, quality systems, research methods, modelling and product development are sensible categories.",
    ],
    [
      "Where should programme information be verified?",
      "Check the current official CCT website and campus notices because programme and admission information can change.",
    ],
  ],
  bsc: [
    [
      "What B.Sc. study areas are represented at CCT?",
      "CCT's academic material includes physical and biological science areas.",
    ],
    [
      "What is useful for B.Sc. students?",
      "Core science texts, laboratory methods, problem sets, field/lab references and trusted educational videos make useful resources.",
    ],
    [
      "Can CCT BUZZ replace official notices?",
      "No. Use CCT's official website for official notices and use this page for organization and learning support.",
    ],
  ],
  microbiology: [
    [
      "Does CCT have a Microbiology department?",
      "Yes. CCT lists Microbiology among its academic departments/programmes.",
    ],
    [
      "What are core microbiology resource areas?",
      "Microbial physiology, genetics, immunology, laboratory techniques, culture methods and microbial ecology are useful categories.",
    ],
    [
      "Why are lab resources important?",
      "Microbiology learning depends strongly on safe, correct laboratory technique, so students should cross-check procedures with instructors and approved manuals.",
    ],
  ],
  geology: [
    [
      "Does CCT offer Geology?",
      "Yes. Geology is listed among CCT's academic areas.",
    ],
    [
      "What should a geology student keep in a resource shelf?",
      "Mineralogy, petrology, structural geology, stratigraphy, geomorphology, field methods and geological maps are useful categories.",
    ],
    [
      "Are online geology maps and datasets reliable?",
      "They can be excellent learning resources, but students should check the source, date, scale and metadata before using them academically.",
    ],
  ],
};
if ($("facultyTitle")) {
  $("facultyTitle").textContent = data.name;
  $("facultyDescription").textContent =
    `A focused student space for ${data.focus}.`;
  $("facultyEyebrow").textContent = `CCT BUZZ · ${data.desc.toUpperCase()}`;
  $("snapshot").textContent =
    `Your ${data.name} space brings together learning material, practice and quick answers around ${data.focus}.`;
  $(`quizLink`).href = `quiz.html?faculty=${key}`;
  $(`resourceLink`).href = `resources.html?faculty=${key}`;
  $("faqIntro").textContent =
    `Quick orientation for ${data.name}. Programme facts should still be verified against current official CCT information.`;
  $("facultyFaq").innerHTML = (faqByFaculty[key] || faqByFaculty.csit)
    .map((x) => `<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`)
    .join("");
}
if ($("backTop"))
  $("backTop").addEventListener("click", (e) => {
    e.preventDefault();
    scrollTo({ top: 0, behavior: "smooth" });
  });

/* Quiz */
let quizData = null,
  currentLevel = null,
  currentIndex = 0,
  earned = 0,
  answered = false;
async function initQuiz() {
  if (!$("quizTitle")) return;
  $("quizTitle").textContent = `${data.name} quiz`;
  $("quizEyebrow").textContent = `CCT BUZZ · ${data.name.toUpperCase()} · QUIZ`;
  const facultyUrl = `faculty.html?faculty=${key}`;
  $("quizBack").href = facultyUrl;
  $("quizFacultyLink").href = facultyUrl;
  $("quizFacultyMobile").href = facultyUrl;
  const saved = Number(localStorage.getItem("cctBuzzPoints") || 0);
  $("score").textContent = saved;
  try {
    const r = await fetch("quiz-data.json");
    quizData = await r.json();
  } catch (e) {
    $("quizSub").textContent =
      "Could not load quiz-data.json. Keep the files in the same folder.";
    return;
  }
  document
    .querySelectorAll("#levelPicker button")
    .forEach((b) =>
      b.addEventListener("click", () => startLevel(b.dataset.level)),
    );
  $("nextQuestion")?.addEventListener("click", nextQuestion);
}
function startLevel(level) {
  currentLevel = level;
  currentIndex = 0;
  earned = 0;
  answered = false;
  $("levelPicker").hidden = true;
  $("quizBox").hidden = false;
  renderQuestion();
  requestAnimationFrame(() => {
    $("quizBox").scrollIntoView({ behavior: "smooth", block: "start" });
    $("quizBox").classList.remove("quiz-focus");
    void $("quizBox").offsetWidth;
    $("quizBox").classList.add("quiz-focus");
  });
}
function renderQuestion() {
  const qs = quizData[key].levels[currentLevel],
    q = qs[currentIndex];
  answered = false;
  $("feedback").textContent = "Choose an answer — feedback appears instantly.";
  $("feedback").className = "quiz-hint";
  $("nextQuestion").disabled = true;
  $("nextQuestion").textContent =
    currentIndex === qs.length - 1 ? "Finish level →" : "Next question →";
  $("questionCount").textContent =
    `Question ${currentIndex + 1} / ${qs.length}`;
  $("levelName").textContent = currentLevel.toUpperCase();
  $("questionText").textContent = q.question;
  $("progressBar").style.width = `${(currentIndex / qs.length) * 100}%`;
  $("answers").innerHTML = q.options
    .map(
      (o, i) =>
        `<button type="button" data-i="${i}"><span class="answer-letter">${String.fromCharCode(65 + i)}</span><span>${o}</span></button>`,
    )
    .join("");
  $("answers")
    .querySelectorAll("button")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        answerQuestion(Number(btn.dataset.i)),
      ),
    );
}
function answerQuestion(index) {
  if (answered) return;
  answered = true;
  const q = quizData[key].levels[currentLevel][currentIndex],
    buttons = [...document.querySelectorAll(".answers button")],
    correctIndex = q.options.indexOf(q.answer);
  buttons.forEach((b) => (b.disabled = true));
  buttons[correctIndex]?.classList.add("correct");
  if (index === correctIndex) {
    earned += q.points;
    buttons[index]?.classList.add("selected-correct");
    $("feedback").textContent = `Correct! +${q.points} points`;
    $("feedback").className = "correct-text";
  } else {
    buttons[index]?.classList.add("wrong");
    $("feedback").textContent =
      `Not quite. The correct answer is highlighted in green.`;
    $("feedback").className = "wrong-text";
  }
  $("nextQuestion").disabled = false;
  $("progressBar").style.width =
    `${((currentIndex + 1) / quizData[key].levels[currentLevel].length) * 100}%`;
}
function nextQuestion() {
  if (!answered) return;
  const qs = quizData[key].levels[currentLevel];
  if (currentIndex === qs.length - 1) finishLevel();
  else {
    currentIndex++;
    renderQuestion();
    requestAnimationFrame(() =>
      $("quizBox").scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }
}
function finishLevel() {
  const old = Number(localStorage.getItem("cctBuzzPoints") || 0),
    total = old + earned;
  localStorage.setItem("cctBuzzPoints", String(total));
  localStorage.setItem(
    `cctBuzzProgress_${key}_${currentLevel}`,
    JSON.stringify({ earned, completedAt: new Date().toISOString() }),
  );
  $("score").textContent = total;
  $("quizBox").hidden = true;
  $("levelPicker").hidden = false;
  $("levelPicker").scrollIntoView({ behavior: "smooth", block: "start" });
  $("earned").textContent = `+${earned}`;
  $("resultTitle").textContent =
    earned >= 100
      ? "Excellent run."
      : earned >= 60
        ? "Solid work."
        : "Keep practising.";
  $("resultText").textContent =
    `You finished the ${currentLevel} level. Your lifetime CCT BUZZ game points are now ${total}.`;
  openQuizResult();
}
function openQuizResult() {
  const m = $("quizResultModal");
  if (!m) return;
  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
}
function closeQuizResult() {
  const m = $("quizResultModal");
  if (!m) return;
  m.classList.remove("open");
  m.setAttribute("aria-hidden", "true");
}
if ($("quizResultModal")) {
  $("quizResultClose")?.addEventListener("click", closeQuizResult);
  $("quizResultBackdrop")?.addEventListener("click", closeQuizResult);
  $("again")?.addEventListener("click", () => {
    closeQuizResult();
    startLevel(currentLevel);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeQuizResult();
  });
}

/* Resource library */
const resourceTypes = [
  {
    key: "books",
    title: "Books & textbooks",
    tag: "READ",
    icon: "book",
    desc: "Textbooks and reference shelves for building durable concepts.",
  },
  {
    key: "pdfs",
    title: "PDFs & notes",
    tag: "STUDY",
    icon: "pdf",
    desc: "Open notes, handbooks, manuals and printable study material.",
  },
  {
    key: "youtube",
    title: "YouTube learning",
    tag: "WATCH",
    icon: "youtube",
    desc: "Faculty-specific visual lessons, demonstrations and lectures.",
  },
  {
    key: "pages",
    title: "Learning pages",
    tag: "EXPLORE",
    icon: "globe",
    desc: "Focused explainers, glossaries and interactive learning pages.",
  },
  {
    key: "websites",
    title: "Websites & portals",
    tag: "CONNECT",
    icon: "link",
    desc: "Authoritative academic portals, datasets, institutions and tools.",
  },
];
if ($("resourceTitle")) {
  $("resourceTitle").textContent = `${data.name} resource library`;
  $(`resourceEyebrow`).textContent =
    `CCT BUZZ · ${data.desc.toUpperCase()} · LEARNING LIBRARY`;
  $(`resourceDescription`).textContent =
    `A connected shelf for ${data.focus}. Choose a format below to open a dedicated ${data.name} collection.`;
  const fu = `faculty.html?faculty=${key}`;
  $(`resourceBack`).href = fu;
  $(`resourceFacultyNav`).href = fu;
  $(`resourceFacultyMobile`).href = fu;
  const p = getProfile();
  $("resourceProfile").textContent = p
    ? `Your space: ${facultyData[p.faculty]?.name || p.faculty} · ${p.semester}`
    : `Select your faculty and semester to personalize your space.`;
  $("resourceGrid").innerHTML = resourceTypes
    .map(
      (r, i) =>
        `<a class="resource-card resource-card-link" href="resource-type.html?faculty=${key}&type=${r.key}"><div class="resource-card-top"><span>${String(i + 1).padStart(2, "0")}</span><b>${r.tag}</b></div><div class="resource-icon">${icon(r.icon)}</div><h2>${r.title}</h2><p>${r.desc}</p><span class="resource-open">Open ${r.title.toLowerCase()} <span>${icon("arrow")}</span></span></a>`,
    )
    .join("");
}

/* Dedicated resource type pages */
const resourceCatalog = {
  csit: {
    books: [
      [
        "OpenStax — Introduction to Computer Science",
        "Free introductory computer science text and concepts.",
        "https://openstax.org/subjects/computer-science",
      ],
      [
        "CLRS reference — Algorithms",
        "A classic algorithms reference to pair with coursework.",
        "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
      ],
      [
        "NPTEL Computer Science",
        "University-level courses covering algorithms, programming and systems.",
        "https://nptel.ac.in/courses",
      ],
    ],
    pdfs: [
      [
        "MIT OpenCourseWare — CS notes",
        "Course materials, lecture notes and assignments.",
        "https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science",
      ],
      [
        "Python documentation",
        "Official language reference and tutorials.",
        "https://docs.python.org/3/",
      ],
      [
        "MDN Web Docs",
        "Authoritative web-development documentation.",
        "https://developer.mozilla.org/en-US/",
      ],
    ],
    youtube: [
      [
        "NPTEL Computer Science",
        "University lecture playlists across core CS subjects.",
        "https://www.youtube.com/@nptelhrd/search?query=computer%20science",
      ],
      [
        "freeCodeCamp",
        "Long-form programming and web-development lessons.",
        "https://www.youtube.com/@freecodecamp/search?query=computer%20science",
      ],
      [
        "MIT OpenCourseWare",
        "Recorded university lectures and course material.",
        "https://www.youtube.com/@mitocw/search?query=computer%20science",
      ],
    ],
    pages: [
      [
        "MDN Web Docs",
        "Web APIs, HTML, CSS and JavaScript references.",
        "https://developer.mozilla.org/",
      ],
      [
        "GeeksforGeeks — CS topics",
        "Topic-based practice and explanations.",
        "https://www.geeksforgeeks.org/",
      ],
      [
        "W3Schools — SQL",
        "Quick interactive SQL references and examples.",
        "https://www.w3schools.com/sql/",
      ],
    ],
    websites: [
      [
        "Khan Academy Computing",
        "Interactive computing and programming learning.",
        "https://www.khanacademy.org/computing",
      ],
      [
        "LeetCode",
        "Programming and algorithm practice.",
        "https://leetcode.com/",
      ],
      [
        "GitHub",
        "Code hosting and collaborative project practice.",
        "https://github.com/",
      ],
    ],
  },
  bit: {
    books: [
      [
        "OpenStax — Computer Science",
        "Free introductory computing reference.",
        "https://openstax.org/subjects/computer-science",
      ],
      [
        "NPTEL IT courses",
        "University-level information technology courses.",
        "https://nptel.ac.in/courses",
      ],
      [
        "OER Commons",
        "Searchable open educational materials.",
        "https://oercommons.org/",
      ],
    ],
    pdfs: [
      [
        "MIT OCW — Information systems & computing",
        "Open course notes and assignments.",
        "https://ocw.mit.edu/search/?q=information+technology",
      ],
      [
        "Python documentation",
        "Official programming reference.",
        "https://docs.python.org/3/",
      ],
      [
        "MDN Web Docs",
        "Web development documentation.",
        "https://developer.mozilla.org/",
      ],
    ],
    youtube: [
      [
        "freeCodeCamp",
        "Programming, databases and web-development lessons.",
        "https://www.youtube.com/@freecodecamp/search?query=information%20technology",
      ],
      [
        "NPTEL",
        "University courses in IT and software topics.",
        "https://www.youtube.com/@nptelhrd/search?query=information%20technology",
      ],
      [
        "Microsoft Developer",
        "Software development and cloud learning.",
        "https://www.youtube.com/@MicrosoftDeveloper/search?query=web%20development",
      ],
    ],
    pages: [
      ["MDN", "Web platform documentation.", "https://developer.mozilla.org/"],
      [
        "W3Schools",
        "Quick references for web technologies and SQL.",
        "https://www.w3schools.com/",
      ],
      [
        "IBM Technology",
        "Short explainers for IT concepts.",
        "https://www.ibm.com/think/topics",
      ],
    ],
    websites: [
      [
        "Microsoft Learn",
        "Structured technology learning paths.",
        "https://learn.microsoft.com/training/",
      ],
      [
        "GitHub Skills",
        "Hands-on GitHub learning exercises.",
        "https://skills.github.com/",
      ],
      [
        "Khan Academy Computing",
        "Interactive programming fundamentals.",
        "https://www.khanacademy.org/computing",
      ],
    ],
  },
  btech: {
    books: [
      [
        "FAO — Food safety resources",
        "International food science and safety references.",
        "https://www.fao.org/food-safety/en/",
      ],
      [
        "OpenStax Biology",
        "Open biology foundation useful for food microbiology.",
        "https://openstax.org/details/books/biology-2e",
      ],
      [
        "NPTEL Food Technology",
        "University food engineering and processing courses.",
        "https://nptel.ac.in/courses",
      ],
    ],
    pdfs: [
      [
        "FAO food safety publications",
        "Guides, reports and manuals.",
        "https://www.fao.org/publications/en/",
      ],
      [
        "WHO food safety",
        "Technical reports and guidance.",
        "https://www.who.int/health-topics/food-safety",
      ],
      [
        "FDA Food Safety",
        "Regulatory and technical reference material.",
        "https://www.fda.gov/food",
      ],
    ],
    youtube: [
      [
        "NPTEL Food Technology",
        "Lectures on food processing, engineering and science.",
        "https://www.youtube.com/@nptelhrd/search?query=food%20technology",
      ],
      [
        "FAO",
        "Food systems, safety and agriculture videos.",
        "https://www.youtube.com/@FAOoftheUN/search?query=food%20safety",
      ],
      [
        "IFT",
        "Food science and technology talks.",
        "https://www.youtube.com/@iftorg/search?query=food%20science",
      ],
    ],
    pages: [
      [
        "FDA Food",
        "Food science, safety and processing information.",
        "https://www.fda.gov/food",
      ],
      [
        "FAO Food Safety",
        "International food safety explainers and resources.",
        "https://www.fao.org/food-safety/en/",
      ],
      [
        "USDA Food Safety",
        "Food safety education and science resources.",
        "https://www.fsis.usda.gov/food-safety",
      ],
    ],
    websites: [
      [
        "Codex Alimentarius",
        "International food standards and guidelines.",
        "https://www.fao.org/fao-who-codexalimentarius/en/",
      ],
      [
        "IFT",
        "Professional food science organization and resources.",
        "https://www.ift.org/",
      ],
      [
        "FDA",
        "Food regulation and scientific guidance.",
        "https://www.fda.gov/food",
      ],
    ],
  },
  mtech: {
    books: [
      [
        "NPTEL Food Engineering",
        "Advanced university-level food engineering courses.",
        "https://nptel.ac.in/courses",
      ],
      [
        "FAO publications",
        "Research and technical publications around food systems.",
        "https://www.fao.org/publications/en/",
      ],
      [
        "IFT resources",
        "Professional food science resources and references.",
        "https://www.ift.org/",
      ],
    ],
    pdfs: [
      [
        "FAO technical publications",
        "Reports, manuals and technical documents.",
        "https://www.fao.org/publications/en/",
      ],
      [
        "WHO food safety publications",
        "Technical guidance and reports.",
        "https://www.who.int/health-topics/food-safety",
      ],
      [
        "FDA guidance",
        "Regulatory and technical guidance.",
        "https://www.fda.gov/regulatory-information/search-fda-guidance-documents",
      ],
    ],
    youtube: [
      [
        "NPTEL advanced food technology",
        "Advanced processing and engineering lectures.",
        "https://www.youtube.com/@nptelhrd/search?query=food%20engineering",
      ],
      [
        "IFT",
        "Food science research and technology talks.",
        "https://www.youtube.com/@iftorg/search?query=food%20technology",
      ],
      [
        "FAO",
        "Food systems and technology talks.",
        "https://www.youtube.com/@FAOoftheUN/search?query=food%20technology",
      ],
    ],
    pages: [
      [
        "FAO Knowledge Repository",
        "Research and technical knowledge.",
        "https://www.fao.org/publications/en/",
      ],
      [
        "IFT Food Technology",
        "Industry and research explainers.",
        "https://www.ift.org/",
      ],
      [
        "WHO Food Safety",
        "Evidence-based food safety information.",
        "https://www.who.int/health-topics/food-safety",
      ],
    ],
    websites: [
      [
        "Codex Alimentarius",
        "International food standards.",
        "https://www.fao.org/fao-who-codexalimentarius/en/",
      ],
      ["IFT", "Food science professional resources.", "https://www.ift.org/"],
      [
        "FAO",
        "International food and agriculture resources.",
        "https://www.fao.org/",
      ],
    ],
  },
  bsc: {
    books: [
      [
        "OpenStax Biology",
        "Free foundational biology textbook.",
        "https://openstax.org/details/books/biology-2e",
      ],
      [
        "OpenStax Physics",
        "Free introductory physics textbook.",
        "https://openstax.org/subjects/science",
      ],
      [
        "MIT OCW Science",
        "Open university courses across science.",
        "https://ocw.mit.edu/search/?d=Science",
      ],
    ],
    pdfs: [
      [
        "OpenStax textbooks",
        "Free downloadable science textbooks.",
        "https://openstax.org/subjects/science",
      ],
      [
        "MIT OCW",
        "Lecture notes, assignments and exams.",
        "https://ocw.mit.edu/",
      ],
      [
        "NASA science resources",
        "Educational science material and datasets.",
        "https://science.nasa.gov/",
      ],
    ],
    youtube: [
      [
        "Khan Academy Science",
        "Clear science lessons across disciplines.",
        "https://www.youtube.com/@khanacademy/search?query=science",
      ],
      [
        "MIT OpenCourseWare",
        "University science lectures.",
        "https://www.youtube.com/@mitocw/search?query=science",
      ],
      [
        "NPTEL Science",
        "University science and engineering lectures.",
        "https://www.youtube.com/@nptelhrd/search?query=science",
      ],
    ],
    pages: [
      [
        "Khan Academy",
        "Interactive science learning.",
        "https://www.khanacademy.org/science",
      ],
      [
        "OpenStax",
        "Open textbooks and learning materials.",
        "https://openstax.org/subjects/science",
      ],
      [
        "NASA Science",
        "Earth, space and physical science resources.",
        "https://science.nasa.gov/",
      ],
    ],
    websites: [
      [
        "PubMed",
        "Biomedical literature search.",
        "https://pubmed.ncbi.nlm.nih.gov/",
      ],
      [
        "NASA Science",
        "Science datasets and missions.",
        "https://science.nasa.gov/",
      ],
      [
        "MIT OpenCourseWare",
        "Open university courses.",
        "https://ocw.mit.edu/",
      ],
    ],
  },
  microbiology: {
    books: [
      [
        "OpenStax Microbiology",
        "Free introductory microbiology textbook.",
        "https://openstax.org/details/books/microbiology",
      ],
      [
        "NCBI Bookshelf",
        "Free biomedical and microbiology books.",
        "https://www.ncbi.nlm.nih.gov/books/",
      ],
      [
        "NPTEL Microbiology",
        "University microbiology courses.",
        "https://nptel.ac.in/courses",
      ],
    ],
    pdfs: [
      [
        "WHO Laboratory Biosafety",
        "Laboratory safety guidance and manuals.",
        "https://www.who.int/publications/i/item/9789240011311",
      ],
      [
        "CDC Microbiology resources",
        "Public health microbiology information.",
        "https://www.cdc.gov/laboratory/",
      ],
      [
        "NCBI Bookshelf",
        "Free reference chapters and books.",
        "https://www.ncbi.nlm.nih.gov/books/",
      ],
    ],
    youtube: [
      [
        "NPTEL Microbiology",
        "University microbiology lectures.",
        "https://www.youtube.com/@nptelhrd/search?query=microbiology",
      ],
      [
        "ASM",
        "Microbiology talks and demonstrations.",
        "https://www.youtube.com/@ASMicrobiology/search?query=microbiology",
      ],
      [
        "CDC",
        "Public health and laboratory videos.",
        "https://www.youtube.com/@CDC/search?query=microbiology",
      ],
    ],
    pages: [
      [
        "NCBI Bookshelf",
        "Biomedical and microbiology reference pages.",
        "https://www.ncbi.nlm.nih.gov/books/",
      ],
      [
        "CDC Laboratory",
        "Laboratory methods and public health resources.",
        "https://www.cdc.gov/laboratory/",
      ],
      [
        "American Society for Microbiology",
        "Professional microbiology resources.",
        "https://asm.org/",
      ],
    ],
    websites: [
      [
        "NCBI",
        "Literature, genes, proteins and biomedical databases.",
        "https://www.ncbi.nlm.nih.gov/",
      ],
      [
        "PubMed",
        "Biomedical research literature.",
        "https://pubmed.ncbi.nlm.nih.gov/",
      ],
      ["ASM", "Professional microbiology society.", "https://asm.org/"],
    ],
  },
  geology: {
    books: [
      [
        "OpenStax Geology",
        "Free introductory Earth science textbook.",
        "https://openstax.org/details/books/earth-science",
      ],
      [
        "USGS Publications",
        "Earth science publications and reports.",
        "https://pubs.usgs.gov/",
      ],
      [
        "NPTEL Earth Sciences",
        "University-level Earth science courses.",
        "https://nptel.ac.in/courses",
      ],
    ],
    pdfs: [
      [
        "USGS Publications",
        "Maps, reports and scientific papers.",
        "https://pubs.usgs.gov/",
      ],
      [
        "British Geological Survey",
        "Geological publications and datasets.",
        "https://www.bgs.ac.uk/geological-resources/",
      ],
      [
        "NASA Earthdata",
        "Earth observation data and documentation.",
        "https://www.earthdata.nasa.gov/",
      ],
    ],
    youtube: [
      [
        "USGS",
        "Earth science videos and field explanations.",
        "https://www.youtube.com/@usgs/search?query=geology",
      ],
      [
        "NPTEL Earth Sciences",
        "University geology and Earth science lectures.",
        "https://www.youtube.com/@nptelhrd/search?query=geology",
      ],
      [
        "Geological Society",
        "Geoscience talks and learning content.",
        "https://www.youtube.com/@geolsoc/search?query=geology",
      ],
    ],
    pages: [
      [
        "USGS Water Science",
        "Earth, water and geoscience explainers.",
        "https://www.usgs.gov/",
      ],
      [
        "BGS Resources",
        "Geological maps, resources and explanations.",
        "https://www.bgs.ac.uk/geological-resources/",
      ],
      [
        "NASA Earth Observatory",
        "Earth-system imagery and explanations.",
        "https://earthobservatory.nasa.gov/",
      ],
    ],
    websites: [
      [
        "USGS",
        "Maps, datasets and Earth science research.",
        "https://www.usgs.gov/",
      ],
      ["BGS", "Geological maps and datasets.", "https://www.bgs.ac.uk/"],
      [
        "NASA Earthdata",
        "Earth observation datasets.",
        "https://www.earthdata.nasa.gov/",
      ],
    ],
  },
};
const typeMeta = Object.fromEntries(resourceTypes.map((r) => [r.key, r]));
if ($("typeTitle")) {
  const type = params.get("type") || "books",
    meta = typeMeta[type] || typeMeta.books,
    catalog =
      (resourceCatalog[key] && resourceCatalog[key][type]) ||
      resourceCatalog.csit.books;
  $("typeEyebrow").textContent =
    `CCT BUZZ · ${data.name.toUpperCase()} · ${meta.tag}`;
  $("typeTitle").textContent = `${data.name}: ${meta.title}`;
  $("typeDescription").textContent = meta.desc;
  const fu = `resources.html?faculty=${key}`;
  $("typeBack").href = fu;
  $("typeFacultyLink").href = `faculty.html?faculty=${key}`;
  $("typeFacultyMobile").href = `faculty.html?faculty=${key}`;
  $("typeResourcesNav").href = `resources.html?faculty=${key}`;
  $("typeResourcesMobile").href = `resources.html?faculty=${key}`;
  $("typeIcon").innerHTML = icon(meta.icon);
  $("resourceTypeGrid").innerHTML = catalog
    .map(
      (r, i) =>
        `<a class="curated-resource" href="${r[2]}" target="_blank" rel="noopener"><div class="curated-index">${String(i + 1).padStart(2, "0")}</div><div><span class="curated-tag">${meta.tag}</span><h2>${r[0]}</h2><p>${r[1]}</p><span class="curated-open">Open source ${icon("arrow")}</span></div></a>`,
    )
    .join("");
}
initQuiz();
