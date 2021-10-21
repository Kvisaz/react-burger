interface ExtendedWindow {
  isLogAllowed?: boolean;
}

export function logg(...args: any[]) {
  const { isLogAllowed } = window as ExtendedWindow;
  if (isLogAllowed === true) console.log(...args);
}

export function loggOff() {
  (window as ExtendedWindow).isLogAllowed = false;
}

export function loggOn() {
  (window as ExtendedWindow).isLogAllowed = true;
}

loggOn();