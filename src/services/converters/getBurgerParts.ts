import { IBurgerPart } from '../model/IBurgerPart';

export function getBurgerParts(ids: string[], ingredients: IBurgerPart[]): IBurgerPart[] {
  return removeDuplicates(
    sortParts(
      mapBurgerParts(ids, ingredients),
    ),
  );
}

function getBurgerPart(id: string, ingredients: IBurgerPart[]): IBurgerPart | undefined {
  return ingredients.filter(p => p._id === id)[0];
}

function mapBurgerParts(ids: string[], parts: IBurgerPart[]): IBurgerPart[] {
  return ids.reduce<IBurgerPart[]>((acc, id) => {
    const nextPart = getBurgerPart(id, parts);
    if (nextPart) acc.push(nextPart);
    return acc;
  }, []);
}

function sortParts(parts: IBurgerPart[]): IBurgerPart[] {
  return parts.sort((a) => a.type === 'bun' ? -1 : 1);
}

function removeDuplicates(parts: IBurgerPart[]): IBurgerPart[] {
  return Array.from(new Set(parts));
}