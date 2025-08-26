// Флаг: использовать JSON или хардкод
const USE_JSON = true;

// Хардкод (временно)
const MOCK_DATA = {
  subs: 124832,
  daily: 248,
  updated: "15 мая 2025, 14:30"
};

// Цель для прогресс-бара
const TARGET = 150000;

async function loadStats() {
  let data = MOCK_DATA;

  if (USE_JSON) {
    try {
      const res = await fetch('data.json?t=' + new Date().getTime());
      data = await res.json();
    } catch (e) {
      console.warn("Не удалось загрузить data.json, используем заглушку");
    }
  }

  // Обновляем DOM
  document.getElementById('counter').textContent = 
    new Intl.NumberFormat('ru-RU').format(data.subs);

  document.getElementById('daily').textContent = 
    new Intl.NumberFormat('ru-RU').format(data.daily);

  document.getElementById('updateTime').textContent = data.updated;

  // Прогресс-бар
  const progress = Math.min((data.subs / TARGET) * 100, 100);
  document.getElementById('fillBar').style.width = `${progress}%`;
}

// Загружаем при старте
document.addEventListener("DOMContentLoaded", loadStats);

// Обновляем каждые 5 минут
setInterval(loadStats, 5 * 60 * 1000);
