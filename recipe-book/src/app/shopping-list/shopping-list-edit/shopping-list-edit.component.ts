import {Component, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {Subscription} from 'rxjs';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';

/**
 * interact with user by form to edit/create/delete an ingredient. Detailed functions are:
 * - property binding to get the ingredient index.
 * - If ingredient index is less than 0, into “create” mode and interact with the user to add an ingredient.
 * - If the ingredient index is no less than 0, into “edit” mode, and interact with the user to edit/delete the ingredient.
 */
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  /**
   * subscription of index of clicked ingredient
   */
  startedEditingSubscription: Subscription;
  /**
   * "edit an ingredient" or "new ingredient"
   */
  editMode = false;
  /**
   * index of clicked ingredient
   */
  index: number;
  /**
   * ingredient
   */
  ingredient: Ingredient;

  /**
   * form
   */
  @ViewChild('f', {static: false}) form: NgForm;

  /**
   * constructor injects shopping list service
   * @param shoppingListService
   */
  constructor(private shoppingListService: ShoppingListService) { }

  /**
   * when loaded, subscribe to ingredient click. When clicked, switch to "edit an ingredient" mode and initialize the ingredient and form
   */
  ngOnInit() {
    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editMode = true;
      this.index = index;
      this.ingredient = this.shoppingListService.getIngredient(this.index);
      this.form.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount
      });
    });
  }

  /**
   * respond to "submit" button, and add an ingredient/update an ingredient
   */
  onSubmit() {
    const newIngredient = new Ingredient(
      this.form.value.name,
      this.form.value.amount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.index, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  /**
   * respond to "delete" button and delete the ingredient
   */
  onDelete() {
    this.shoppingListService.deleteIngredient(this.index);
    this.onClear();
  }

  /**
   * respond to "clear" button and clear form
   */
  onClear() {
    this.form.reset();
    this.editMode = false;
  }
}
