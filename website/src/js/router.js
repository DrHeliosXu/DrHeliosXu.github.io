export function currentRoute() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return {
    language: parts[0] || 'cn',
    page: parts[1] || 'index.html'
  };
}
