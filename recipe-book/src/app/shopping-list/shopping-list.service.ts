import { Injectable } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

/**
 * Shopping list service to add/modify/delete an ingredient from shopping list, and adding ingredients to shopping list.
 */
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  /**
   * ingredients in shopping list
   */
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 5)
  ];
  /**
   * Observable for shopping list data change
   */
  ingredientsChanged = new Subject<Ingredient []>();
  /**
   * Observable for component data communication of ingredient index
   */
  startedEditing = new Subject<number>();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * return ingredients
   */
  getIngredients() {
    return this.ingredients.slice();
  }

  /**
   * return one ingredient
   * @param index
   */
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  /**
   * add an ingredient
   * @param ingredient
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * add ingredients
   * @param ingredients
   */
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * delete an ingredient
   * @param index
   */
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * update an ingredient
   * @param index
   * @param ingredient
   */
  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
