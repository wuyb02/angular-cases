import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

/**
 * Service to fetch and save data to database.
 */
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  /**
   * constructor injects http client and recipe service
   * @param http
   * @param recipeService
   */
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  /**
   * save data to database
   */
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-m.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => console.log(response));
  }

  /**
   * fetch data from database
   */
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-m.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
          console.log(recipes);
        })
      );
  }
}
