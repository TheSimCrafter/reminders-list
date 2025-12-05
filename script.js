// --- LocalStorage Schlüssel ---
const STORAGE_KEY = "reminderList";

// DOM Elemente
const input = document.getElementById("inputText");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("list");

// Liste laden
let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Elemente direkt beim Start anzeigen
renderList();

// Klick auf HINZUFÜGEN
addBtn.onclick = () => {
    const value = input.value.trim();
    if (!value) return;

    items.push(value);
    input.value = "";
    save();
    renderList();
};

// Speichern
function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Liste neu rendern
function renderList() {
    listContainer.innerHTML = "";

    items.forEach((text, index) => {
        const div = document.createElement("div");
        div.className = "list-item";

        const span = document.createElement("span");
        span.textContent = text;

        const del = document.createElement("button");
        del.className = "remove-btn";
        del.textContent = "X";
        del.onclick = () => {
            items.splice(index, 1);
            save();
            renderList();
        };

        div.appendChild(span);
        div.appendChild(del);
        listContainer.appendChild(div);
    });
}
