const counter = document.getElementById('counter');
const changeEl = document.getElementById('change');
const progressBar = document.getElementById('progressBar');
const percent = document.getElementById('percent');
const updated = document.getElementById('updated');

const TARGET = 150000; // Цель
let lastCount = 0;

async function updateCounter() {
  try {
    const res = await fetch('/api/fetch-subs');
    const data = await res.json();

    if (data.subs !== undefined) {
      const now = new Date();
      const prev = localStorage.getItem('lastCount');
      const prevTime = localStorage.getItem('lastTime');

      const change = prev ? data.subs - parseInt(prev) : 0;

      counter.textContent = formatNumber(data.subs);
      changeEl.textContent = change > 0 ? `+${change}` : change;
      updated.textContent = now.toLocaleTimeString('ru-RU');

      // Прогресс
      const progress = Math.min((data.subs / TARGET) * 100, 100);
      progressBar.style.width = `${progress}%`;
      percent.textContent = `${progress.toFixed(1)}%`;

      // Сохраняем
      localStorage.setItem('lastCount', data.subs);
      localStorage.setItem('lastTime', now.toISOString());
    }
  } catch (err) {
    console.error("Ошибка:", err);
    changeEl.textContent = "ошибка";
  }
}

function formatNumber(num) {
  return new Intl.NumberFormat('ru-RU').format(num);
}

// Обновляем при загрузке
updateCounter();

// Обновляем каждые 5 минут
setInterval(updateCounter, 5 * 60 * 1000);
