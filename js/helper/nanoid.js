export function nanoid(size = 8) {
  const numbersAndLetters = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
  const letters = 'useandomTPXpxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict';
  let id = letters[(Math.random() * 52) | 0];
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size;
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += numbersAndLetters[(Math.random() * 64) | 0];
  }
  return id;
}
