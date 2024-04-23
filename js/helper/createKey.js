export function createKey(String) {
  if (!String || typeof String !== 'string') {
    console.error(`createKey: ${String}`);
    return;
  }

  const pre = String.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
    .replace(/^[^a-zA-Zа-яА-Я]*/, '');
  return `${pre[0].toLowerCase()}${pre.slice(1)}`;
}
