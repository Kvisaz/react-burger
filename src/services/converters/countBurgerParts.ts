import { IBurgerPart, IBurgerPartCounted } from '../model/IBurgerPart';

export function countBurgerParts(parts: IBurgerPart[]): IBurgerPartCounted[] {
  const idParts: Record<string, IBurgerPartCounted> = {};
  parts.forEach(part => {
    const { _id } = part;
    if (idParts[_id]) idParts[_id].amount++;
    else idParts[_id] = {
      ...part,
      amount: 1,
    };

    if(part.type==='bun') {
      idParts[_id] = {
        ...part,
        amount: 2,
      }
    }
  });
  return Object.values(idParts);
}