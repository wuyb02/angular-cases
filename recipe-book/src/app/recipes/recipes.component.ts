import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * manage receipts. The operations include: list, show details, add, edit, delete, add ingredient of a recipe into the shopping list. Detailed functions are:
 * - display in the list the name/description/image of each recipe.
 * - interact with user to select a recipe and show its details, delete it or add its ingredients into the shopping list.
 * - interact with user to edit a select recipe by form (including name, description, image link, add/edit/remove ingredients).
 * - interact with user to add a new recipe by form.
 */
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  /**
   * Recipes
   */
  recipes: Recipe[];
  /**
   * subscription to recipe data change
   */
  recipesSubscription: Subscription;

  /**
   * Constructor injects recipe service, router service, and route service.
   * @param recipeService
   * @param router
   * @param route
   */
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * When loading, initialize recipe data and subscribe recipe data change
   */
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  /**
   * Response to "New Recipe" button and navigate to the form to create a new recipe
   */
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
