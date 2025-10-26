const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;

function renderCalendar(month, year) {
    calendarBody.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    monthYear.textContent = new Intl.DateTimeFormat('pl', { month: 'long', year: 'numeric'}).format(new Date(year, month));
    
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 1; j <= 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDay) {
                cell.textContent = '';
            } else if (date > daysInMonth) {
                cell.textContent = '';
            } else {
                cell.textContent = date;
                const cellDate = new Date(year, month, date);
                if (cellDate.toDateString() === today.toDateString()) cell.classList.add('today');
                if (selectedDate && cellDate.toDateString() === selectedDate.toDateString()) cell.classList.add('selected');
                cell.addEventListener('click', () => {
                    selectedDate = cellDate;
                    renderCalendar(currentMonth, currentYear);
                    alert(`Wybrano datę: ${selectedDate.toLocaleDateString('pl')}`);
                });
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

prevMonth.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);
