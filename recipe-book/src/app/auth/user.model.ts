/**
 * The User class stores user authentication info, including email, id, token and token expiration date.
 */
export class User {
  /**
   * construct user object using email, id, token, and token experiration date as input
   * @param {string} email user login email
   * @param {string} id user id
   * @param {string} _token
   * @param {Date} _tokenExpirationDate
   */
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  /**
   * return user token if unexpired, and null otherwise.
   */
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
