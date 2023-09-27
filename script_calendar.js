const calendarMenu = document.querySelector(".select-menu"),
    selectBtn = calendarMenu.querySelector(".select-btn"),
    calendarContainer = calendarMenu.querySelector(".calendar"),
    selectedDateLabel = document.getElementById("selected-date");

// Function to update the selected date in the "Month Day, Year" format
const updateSelectedDate = (date) => {
    selectedDateLabel.innerText = date;
};

// Get the current date and set it as the default
const realDate = new Date();
const defaultDate = realDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

// Set the default date in the selectedDateLabel
updateSelectedDate(defaultDate);

// Event listener for the "Select a Date" button click
selectBtn.addEventListener("click", () => {
    calendarMenu.classList.toggle("active");
});

// When a day is clicked in the calendar, update the selected date label
calendarContainer.addEventListener("click", (e) => {
    const selectedDay = e.target.getAttribute("data-day");
    if (!selectedDay) return;

    const selectedDate = `${months[currMonth]} ${selectedDay}, ${currYear}`;
    selectedDateLabel.innerText = selectedDate;
});

const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
let selectedDay = null;


let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

// The 'renderCalendar' function generates and renders the calendar for the current month,
// including displaying days, marking the current day, and enabling day selection.
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li data-day="${i}" class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    
    // This event listener handles clicks on individual day elements in the calendar.
    daysTag.addEventListener("click", (e) => {
        const clickedDay = e.target;
        if (clickedDay.classList.contains("active")) {
            return;
        }

        if (selectedDay) {
            selectedDay.classList.remove("active");
        }

        clickedDay.classList.add("active");
        selectedDay = clickedDay;
    });

    // Function to remove the "active" background from the currently selected day in the calendar
    const removeBackgroundFromCurrentDay = () => {
        const currentDay = daysTag.querySelector(`.active[data-day="${new Date().getDate()}"]`);
        if (currentDay) {
            currentDay.classList.remove("active");
        }
    };

    document.body.addEventListener("click", removeBackgroundFromCurrentDay);

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    // Add event listeners for the new days when the month changes
    const dayElements = document.querySelectorAll(".days li");
    dayElements.forEach((day) => {
        day.addEventListener("click", (e) => {
            const clickedDay = e.target;
            if (clickedDay.classList.contains("active")) {
                return;
            }

            if (selectedDay) {
                selectedDay.classList.remove("active");
            }

            clickedDay.classList.add("active");
            selectedDay = clickedDay;
        });
    });
};
renderCalendar();

// Event listeners for navigation icons (previous and next month)
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});