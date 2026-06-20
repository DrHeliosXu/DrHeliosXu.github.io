export async function renderVisitorStats() {
  const target = document.querySelector('[data-visitor-stats]');
  if (!target) return;

  try {
    const response = await fetch('../data/visitor-stats.json');
    const stats = await response.json();
    target.textContent = String(stats.totalVisitors || '');
  } catch (error) {
    target.textContent = '';
  }
}
