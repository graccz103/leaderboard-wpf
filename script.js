const form = document.getElementById('submit-score-form');
const leaderboardTable = document.getElementById('leaderboard').querySelector('tbody');
const submitButton = form.querySelector('button'); // Pobierz przycisk Submit

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

// Obsługa przesyłania wyników
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const score = document.getElementById('score').value; // Bez parseInt, ponieważ score to czas

    if (!username || !score) {
        alert('Proszę wypełnić wszystkie pola.');
        return;
    }

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    loadLeaderboard();

    // Ukryj przycisk Submit
    submitButton.disabled = true;
    submitButton.style.cursor = 'not-allowed';
    submitButton.style.opacity = '0.5';
});

// Ładowanie wyników przy starcie
loadLeaderboard();
