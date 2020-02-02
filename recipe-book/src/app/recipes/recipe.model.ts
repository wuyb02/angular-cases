import {Ingredient} from '../shared/ingredient.model';

/**
 * Recipe data model, including recipe name, description, image URL, and ingredients.
 */
export class Recipe {
  /**
   * recipe name
   */
  public name: string;
  /**
   * recipe description
   */
  public description: string;
  /**
   * recipe image URL
   */
  public imagePath: string;
  /**
   * recipe ingredients
   */
  public ingredients: Ingredient[];

  /**
   * constructor with recipe name, description, image URL and ingredients as input
   * @param name
   * @param description
   * @param imagePath
   * @param ingredients
   */
  constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
