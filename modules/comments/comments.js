const root = document.currentScript.parentElement;
const form = root.querySelector(".comment-form");
const nameInput = form.querySelector("input");
const contentInput = form.querySelector("textarea");
const list = root.querySelector(".comments-list");

const STORAGE_KEY = "cuoco_comments";

/**
 * Generates a random Date object within the last `days` days.
 * @param {number} days
 * @returns {Date}
 */
function randomDateObj(days = 10) {
    const now = new Date();
    return new Date(now.getTime() - Math.random() * days * 24 * 60 * 60 * 1000);
}

/**
 * Converts a Date object into a clean readable format: "DD/MM/YYYY HH:MM"
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
    return date.toLocaleString('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
        hour12: false
    });
}

/**
 * Dummy comments displayed when the page loads.
 * Each has a random date in the last 30 days.
 */
const dummyComments = [
    { name: "Yuna", content: "Looks amazing!!!", date: randomDateObj(30) },
    { name: "Aiman", content: "Makes me so hungry...", date: randomDateObj(30) },
    { name: "xXxEpicRobloxBrimxXx", content: "Can we put hats on the characters?", date: randomDateObj(30) }
];

/**
 * Sorts comments by date descending (most recent first)
 * and formats the date for display
 */
function sortAndFormatComments(comments) {
    return comments
        .sort((a, b) => b.date - a.date)
        .map(c => ({ ...c, date: formatDate(c.date) }));
}

// Sorted and formatted dummy comments
const sortedDummyComments = sortAndFormatComments(dummyComments);

/**
 * Loads comments either from localStorage or returns sorted dummy comments.
 * @param {boolean} useStorage
 * @returns {Array<{name: string, content: string, date: string}>}
 */
function loadComments(useStorage = false) {
    if (useStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedDummyComments));
        return sortedDummyComments;
    }
    return sortedDummyComments;
}

/**
 * Saves the given comments array to localStorage.
 */
function saveComments(comments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

/**
 * Renders an array of comments in the comments list container.
 */
function render(comments) {
    list.innerHTML = "";

    comments.forEach(c => {
        const div = document.createElement("div");
        div.className = "comment";

        div.innerHTML = `
            <div class="comment-name">${c.name}</div>
            <div class="comment-date">${c.date}</div>
            <div>${c.content}</div>
        `;

        list.appendChild(div);
    });
}

/**
 * Adds a new comment to the comments list.
 */
function addComment(name, content, saveToStorage = false) {
    const comments = loadComments(saveToStorage);

    comments.unshift({
        name,
        content,
        date: formatDate(new Date())
    });

    if (saveToStorage) saveComments(comments);
    render(comments);
}

// Form submission
form.addEventListener("submit", e => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const content = contentInput.value.trim();
    if (!name || !content) return;

    addComment(name, content, false);
    form.reset();
});

// Initial render
render(loadComments(false));