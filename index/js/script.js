document.addEventListener("DOMContentLoaded", () => {
    // --- Табуляція ---
    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            contents.forEach(c => c.classList.remove("active"));
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // --- Локалізація ---
    const langButtons = document.querySelectorAll(".lang");
    let currentLang = "ua";

    const translations = {
        ua: {
            warsztat: "Warsztat",
            mobilna: "Mobilna Wulkanizacja",
            laweta: "Laweta",
            kalendarz: "Kalendarz",
            depozyt: "Depozyt",
            promocje: "Promocje"
        },
        pl: {
            warsztat: "Warsztat",
            mobilna: "Mobilna Wulkanizacja",
            laweta: "Laweta",
            kalendarz: "Kalendarz",
            depozyt: "Depozyt",
            promocje: "Promocje"
        },
        en: {
            warsztat: "Workshop",
            mobilna: "Mobile Tire Service",
            laweta: "Tow Truck",
            kalendarz: "Calendar",
            depozyt: "Deposit",
            promocje: "Promotions"
        }
    };

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentLang = btn.dataset.lang;
            updateLanguage();
        });
    });

    function updateLanguage() {
        tabs.forEach(tab => {
            tab.textContent = translations[currentLang][tab.dataset.tab];
        });
    }

    // --- Календар ---
    const calendarEl = document.getElementById("calendar");
    const today = new Date();

    function renderCalendar(month = today.getMonth(), year = today.getFullYear()) {
        calendarEl.innerHTML = "";
        const date = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "calendar-day";
            day.textContent = i;
            day.addEventListener("click", () => {
                document.querySelectorAll(".calendar-day").forEach(d => d.classList.remove("selected"));
                day.classList.add("selected");
            });
            calendarEl.appendChild(day);
        }
    }

    renderCalendar();

    // --- Депозит / Бокси ---
    const boxesEl = document.getElementById("depozyt-boxes");
    const boxes = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, occupied: Math.random() < 0.3 }));

    function renderBoxes() {
        boxesEl.innerHTML = "";
        boxes.forEach(box => {
            const div = document.createElement("div");
            div.className = "box" + (box.occupied ? " occupied" : "");
            div.textContent = `Boks ${box.id}`;
            if (!box.occupied) {
                div.addEventListener("click", () => {
                    box.occupied = true;
                    renderBoxes();
                    alert(`Wybrano Boks ${box.id}`);
                });
            }
            boxesEl.appendChild(div);
        });
    }

    renderBoxes();

    // --- Загальні сервіси ---
    const services = {
        warsztat: ["Wymiana oleju", "Kontrola hamulców", "Diagnostyka komputerowa"],
        mobilna: ["Mobilna wymiana opon", "Naprawa na miejscu"],
        laweta: ["Transport pojazdów", "Pomoc drogowa"]
    };

    Object.keys(services).forEach(tab => {
        const container = document.getElementById(`${tab}-services`);
        services[tab].forEach(service => {
            const div = document.createElement("div");
            div.textContent = service;
            container.appendChild(div);
        });
    });

    // --- Промоції ---
    const promotionsEl = document.getElementById("promotions");
    const promotions = ["10% zniżki na wymianę opon", "Darmowa diagnostyka przy pierwszej wizycie"];
    promotions.forEach(promo => {
        const div = document.createElement("div");
        div.textContent = promo;
        promotionsEl.appendChild(div);
    });
});
