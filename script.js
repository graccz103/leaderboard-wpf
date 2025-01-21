const form = document.getElementById('submit-score-form');
const leaderboardTable = document.getElementById('leaderboard').querySelector('tbody');

// Funkcja do zamiany czasu z formatu mm:ss na liczbę sekund
function timeToSeconds(time) {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
}

// Funkcja do zamiany czasu z liczby sekund na format mm:ss
function secondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Funkcja do pobierania wyników z localStorage
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.sort((a, b) => timeToSeconds(a.score) - timeToSeconds(b.score)); // Sortuj rosnąco po wyniku (czas)
    leaderboardTable.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td><td>${entry.username}</td><td>${entry.score}</td>`;
        leaderboardTable.appendChild(row);
    });
}

// Funkcja do odczytu parametrów URL i wypełnienia formularza
function populateFormFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const score = urlParams.get('score');

    console.log('URL Params:', { username, score }); // Debugging

    if (username) {
        document.getElementById('username').value = username;
    } else {
        console.log("Username not found in URL.");
    }

    if (score) {
        document.getElementById('score').value = score;
    } else {
        console.log("Score not found in URL.");
    }
}

// Obsługa przesyłania wyników
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const score = document.getElementById('score').value;

    if (!username || !score) return alert('Proszę wypełnić wszystkie pola.');

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    loadLeaderboard();
});

// Inicjalizacja
populateFormFromUrl(); // Wywołanie funkcji odczytującej parametry URL
loadLeaderboard();     // Ładowanie leaderboardu
