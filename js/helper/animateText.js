export function animateText(str) {
  return str
    .split('')
    .map((item, i) => `<span style="transition-delay: ${i * 50}ms">${item}</span>`)
    .join('');
}
