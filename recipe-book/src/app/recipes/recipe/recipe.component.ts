import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';

/**
 * display a receipt and interact with the user to delete it, add its ingredients into the shopping list, or go to the edit page. Detailed functions are:
 * - get the index of the recipe from the route.
 * - display the name, description, image, ingredients of the recipe.
 * - Interact with user to add the ingredients of the recipe to the shopping list.
 * - (when authenticated) interact with the user to go to edit page to edit the reciepe.
 * - (when authenticated) interaction with the user to delete the recipe.
 */
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  /**
   * Recipe
   */
  recipe: Recipe;
  /**
   * Recipe id
   */
  id: number;
  /**
   * button group toggle flag
   */
  isOpen = false;

  /**
   * Constructor injects recipe service, router service and route service.
   * @param recipeService
   * @param route
   * @param router
   */
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * When loading, initialize recipe id from link parameters, and then the recipe. Subscribe the recipe id change
   */
  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(this.id);
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  /**
   * Response to "Edit Recipe" button and navigate to form to edit the recipe
   */
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  /**
   * Response to "Add to shopping list" button and add ingredient of the recipe to shopping list
   */
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.id);
  }

  /**
   * Response to "Delete Recipe" button and delete the recipe
   */
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
