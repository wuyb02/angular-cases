/**
 * Ingredient data model, including ingredient name and quantity
 */
export class Ingredient {
  /**
   * construct with ingredient name and quantity as input
   * @param {string} name ingredient name
   * @param {number} amount ingredient quantity
   */
  constructor(public name: string, public amount: number) {}
}
