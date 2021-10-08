interface ExtendedWindow {
  isLogAllowed?: boolean
}

/**
 *  Можно менять через консоль
 */
(window as ExtendedWindow).isLogAllowed = false;

export function logg(...args: any[]) {
  const { isLogAllowed } = window as ExtendedWindow;
  if (isLogAllowed) console.log(...args);
}