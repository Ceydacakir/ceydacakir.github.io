const terminal = document.getElementById("terminal");
const text = "Ceyda Çakır";
const cursor = "|";
let index = 0;

function type() {
    if (index < text.length) {
        terminal.textContent = text.slice(0, index + 1) + cursor;
        index++;
        setTimeout(type, 150);
    } else {
        terminal.textContent = text;
    }
}

setTimeout(type, 500);

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
    body.classList.add(currentTheme);
    updateButtonText();
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");

    let theme = "dark";
    if (body.classList.contains("light")) {
        theme = "light";
    }
    localStorage.setItem("theme", theme);
    updateButtonText();
});

function updateButtonText() {
    if (body.classList.contains("light")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
}

fetch("https://api.github.com/users/Ceydacakir/repos?sort=updated")
    .then(response => response.json())
    .then(data => {
        const repoList = document.getElementById("repo-list");
        repoList.innerHTML = "";
        data.slice(0, 5).forEach(repo => {
            const li = document.createElement("li");
            const desc = repo.description ? repo.description : "No description available";
            li.innerHTML = `
        <a href="${repo.html_url}" target="_blank" style="font-weight: 600;">${repo.name}</a>
        <span style="color: var(--text-muted); display: block; font-size: 0.9rem;">${desc}</span>
      `;
            repoList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("GitHub Error:", error);
        document.getElementById("repo-list").innerHTML = "<li>Failed to load repos.</li>";
    });

fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ceydie6")
    .then(response => response.json())
    .then(data => {
        const blogList = document.getElementById("blog-list");
        blogList.innerHTML = "";
        data.items.slice(0, 5).forEach(post => {
            const li = document.createElement("li");
            li.innerHTML = `
        <a href="${post.link}" target="_blank" style="font-weight: 600;">${post.title}</a>
         <span style="color: var(--text-muted); display: block; font-size: 0.9rem; font-family: var(--font-mono);">${new Date(post.pubDate).toLocaleDateString()}</span>
      `;
            blogList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Medium Error:", error);
        document.getElementById("blog-list").innerHTML = "<li>Failed to load blog posts.</li>";
    });
