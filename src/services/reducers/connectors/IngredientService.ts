import { IBurgerPart } from '../../model/IBurgerPart';

export class IngredientService {
  private static ingredients: IBurgerPart[] = [];

  static save(ingredients: IBurgerPart[]) {
    IngredientService.ingredients = ingredients;
  }

  static getIngredients(): IBurgerPart[] {
    return IngredientService.ingredients;
  }

}