import { IBurgerPart } from '../model/IBurgerPart';

export class IngredientStorage {
  private static ingredients: IBurgerPart[] = [];

  static save(ingredients: IBurgerPart[]) {
    IngredientStorage.ingredients = ingredients;
  }

  static getIngredients(): IBurgerPart[] {
    return IngredientStorage.ingredients;
  }

}