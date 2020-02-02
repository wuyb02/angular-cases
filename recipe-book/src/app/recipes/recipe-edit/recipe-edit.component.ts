import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

/**
 * edit or create a recipe. Detailed functions are:
 * - get the index of the recipe from the route. If the index is empty, into “create” mode; else, into the “edit” mode.
 * - Interact with the user to fill in or modify info by form with Validators. If in “create” mode, all input fields are empty initially; if in “edit” mode, the recipe info is filled in.
 * - Interact with the user to add, delete, or modify ingredients.
 * - When form submitted, update the recipe in “edit” mode, or add the recipe in “create” mode.
 * - Need CanActivate for link protection
 */
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  /**
   * recipe id
   */
  id: number;
  /**
   * if "Edit a recipe" or "new recipe"
   */
  editMode = false;
  /**
   * Form
   */
  recipeForm: FormGroup;

  /**
   * constructor injects recipe service, route service and router service
   * @param route
   * @param router
   * @param recipeService
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  /**
   * When loading, check if "new recipe" or "edit a recipe". If "edit a recipe", get recipe id from link params and initialize the recipe and form.
   */
  ngOnInit() {
    this.editMode = this.route.snapshot.params.id != null;
    if (this.editMode) {
      this.id = +this.route.snapshot.params.id;
    }
    this.route.params.subscribe((params: Params) => {
      this.editMode = params.id != null;
      if (this.editMode) {
        this.id = +params.id
      }
    });
    this.initForm();
  }

  /**
   * Response to "Save" button, and add a recipe or modify a recipe.
   */
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  /**
   * Response to "Cancel" page and go back to recipe detail page
   */
  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  /**
   * Add ingredient to the recipe
   */
  onAddIngredient() {
    ( <FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  /**
   * Delete an ingredient from the recipe
   * @param index
   */
  onDeleteIngredient(index: number) {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }

  /**
   * Initialize the form with recipe data and validators
   */
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
