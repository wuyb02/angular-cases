import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {Ingredient} from '../shared/ingredient.model';
import {Subscription} from 'rxjs';

/**
 * list the ingredients in the shopping list. Detailed functions are:
 * - list the ingredients info including name and amount.
 * - Host the ShoppingListEditComponent.
 * - interact with the user to select an ingredient and get its index. Property binding with ShoppingListEditComponent to feed the index value. Interact with user by form to edit or delete the ingredients.
 * - When no ingredient is selected, or when the user clicks “add new user” button, interact with the user by form to create a new ingredient in the shopping list.
 */
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  /**
   * ingredients
   */
  ingredients: Ingredient[];
  /**
   * subscription to shopping list change
   */
  slsSubscription: Subscription;

  /**
   * constructor injects shopping list service
   * @param shoppingListService
   */
  constructor(private shoppingListService: ShoppingListService) { }

  /**
   * When loading, initialize shopping list and subscribe to shopping list change
   */
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.slsSubscription = this.shoppingListService.ingredientsChanged.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  /**
   * Respond to click to ingredient and trigger to send the ingredient index
   * @param index
   */
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  /**
   * When component destroyed, unsubscribe to shopping list data change
   */
  ngOnDestroy() {
    this.slsSubscription.unsubscribe();
  }
}
