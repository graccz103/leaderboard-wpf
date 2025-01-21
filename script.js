const form = document.getElementById('submit-score-form');
const leaderboardTable = document.getElementById('leaderboard').querySelector('tbody');

// Funkcja do pobierania wyników z localStorage
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.sort((a, b) => b.score - a.score); // Sortuj malejąco po wyniku
    leaderboardTable.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td><td>${entry.username}</td><td>${entry.score}</td>`;
        leaderboardTable.appendChild(row);
    });
}

// Obsługa parametrów URL
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const score = urlParams.get('score');

    if (username && score) {
        document.getElementById('username').value = username;
        document.getElementById('score').value = score;
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
handleUrlParameters();
loadLeaderboard();
