const MS_IN_DAY = 24 * 3600 * 1000;
const TODAY = new Date();
const TODAY_MAX_MS = `${TODAY.getMonth() + 1} ${TODAY.getDate()} ${TODAY.getFullYear()} 23:59:59`;
const TODAY_MAX_DATE = new Date(TODAY_MAX_MS);

export function formatDate(str: string): string {
  let result = str;
  try {
    const date = new Date(str);
    const msDiff = TODAY_MAX_DATE.getTime() - date.getTime();
    const dayDiff = msDiff / MS_IN_DAY;

    let day = date.toLocaleDateString('ru', {
      dateStyle: 'medium',
    });

    const isToday = dayDiff < 1;
    const isYesterday = dayDiff > 1 && dayDiff < 2;
    const isTwoDay = dayDiff > 2 && dayDiff < 3;

    if (isToday) day = 'Сегодня';
    if (isYesterday) day = 'Вчера';
    if (isTwoDay) day = 'Два дня назад';

    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const timeZoneOffset = Math.floor(date.getTimezoneOffset() / 60);
    const sign = timeZoneOffset > 0 ? '-' : '+';
    const offset = timeZoneOffset !== 0 ? `i-GMT${sign}${Math.abs(timeZoneOffset)}` : '';

    result = `${day}, ${time} ${offset}`;
  } catch (e) {
    console.warn(e);
  }

  return result;
}