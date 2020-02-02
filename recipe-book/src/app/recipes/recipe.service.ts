import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

/**
 * Recipe service to add/modify/delete/return a recipe, or save/return all recipes. When recipes are changed, trigger an event.
 */
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  /**
   * Observable to trigger when recipes are changed.
   */
  recipesChanged = new Subject<Recipe[]>();

  /**
   * Recipes
   */
  private recipes: Recipe[] = [
    new Recipe(
      'Dim Sums',
      'Small bite-sized rounds stuffed with veggies or meat',
      'https://i.ndtvimg.com/i/2015-10/dimsum_625x350_51446202982.jpg',
      [
        new Ingredient('Flour', 5),
        new Ingredient('Meat', 3),
        new Ingredient('Oil', 1)
      ]
    ),
    new Recipe(
      'Hot and Sour Soup',
      'Isn\'t it great to warm up with a hot bowl of soup?',
      'https://i.ndtvimg.com/i/2016-06/soup-625_625x350_81466064298.jpg',
      [
        new Ingredient('Mushroom', 2),
        new Ingredient('Carrot', 2),
        new Ingredient('Red pepper', 2),
        new Ingredient('Vinegar', 1)
      ]
    ),
    new Recipe(
      'Quick Noodles',
      'One of the staples in every home',
      'https://i.ndtvimg.com/i/2016-06/noodles-625_625x350_41466064269.jpg',
      [
        new Ingredient('Noddles', 5),
        new Ingredient('Celery', 2),
        new Ingredient('Cabbage', 2),
        new Ingredient('Shrimp', 2)
      ]
    ),
    new Recipe(
      'Szechwan Chilli Chicken',
      'A fiery delight straight from the Sichuan region',
      'https://i.ndtvimg.com/i/2015-02/chilli-chicken_625x350_81424323578.jpg',
      [
        new Ingredient('Chicken', 5),
        new Ingredient('Red chili', 2),
        new Ingredient('Red pepper', 2),
        new Ingredient('Carrot', 2)
      ]
    ),
    new Recipe(
      'Spring Rolls',
      'A crisp appetizer',
      'https://i.ndtvimg.com/i/2015-02/spring-roll_625x350_51424323845.jpg',
      [
        new Ingredient('Flour', 5),
        new Ingredient('Cabbage', 2),
        new Ingredient('Onion', 2),
        new Ingredient('Carrot', 2)
      ],
    ),
    new Recipe(
      'Stir Fried Tofu with Rice',
      'A simple stir-fry with tofu and oriental sauces',
      'https://i.ndtvimg.com/i/2016-06/tofu-with-rice_625x350_81466070125.jpg',
      [
        new Ingredient('Tofu', 5),
        new Ingredient('Green Onion', 2),
        new Ingredient('Oil', 1),
        new Ingredient('Peanut', 3)
      ],
    ),
    new Recipe(
      'Chicken with Chestnuts',
      'This earthy recipe is perfect for a holiday feast',
      'https://i.ndtvimg.com/i/2016-06/dhaniwal-chicken_625x350_71464783643.jpg',
      [
        new Ingredient('Chicken', 5),
        new Ingredient('Rice', 3),
        new Ingredient('Water chestnut', 1),
        new Ingredient('Red pepper', 3)
      ],
    ),
    new Recipe(
      'Honey Chilli Potato',
      'The quintessential Indo-Chinese snack!',
      'https://i.ndtvimg.com/i/2018-01/honey-chilli-potato_620x330_81514872067.jpg',
      [
        new Ingredient('Potato', 5),
        new Ingredient('Sesame seed', 2),
        new Ingredient('Chili', 1)
      ],
    )
//    new Recipe(
//      'Cantonese Chicken Soup',
//      'heart-warming soup perfect for winter',
//      'https://i.ndtvimg.com/i/2017-12/cantonese-chicken-soup_620x330_81513770498.jpg',
//      [
//        new Ingredient('Chicken', 5),
//        new Ingredient('mushroom', 2),
//        new Ingredient('spring onion', 1)
//      ],
//    )
  ];

  /**
   * Constructor injects shopping list service
   * @param shoppingListService
   */
  constructor(private shoppingListService: ShoppingListService) { }

  /**
   * return all recipes
   */
  getRecipes() {
    return this.recipes.slice();
  }

  /**
   * return a recipe
   * @param index
   */
  getRecipe(index: number) {
    if (index<this.recipes.length) {
      return this.recipes[index];
    } else {
      return null;
    }
  }

  /**
   * set all recipes
   * @param recipes
   */
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(recipes.slice());
  }

  /**
   * Add a new recipe
   * @param recipe
   */
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Change a recipe
   * @param index
   * @param updatedRecipe
   */
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * delete a recipe
   * @param index
   */
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * calls shopping list service to add ingredients of a recipe to the shopping list
   * @param index
   */
  addIngredientsToShoppingList(index: number) {
    this.shoppingListService.addIngredients(this.recipes[index].ingredients);
  }
}
