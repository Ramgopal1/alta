let expiry = 0;
let token;

/**
 * TokenManager
 *
 * Stores the token from the api and caches the token for a duration of time.
 */
class TokenManager {
  /**
   * @param {String} path - The api path to call
   * @param {Number} expiryDuration - The duration in seconds
   */
  constructor(path, expiryDuration = 900) {
    this.expiryDuration = expiryDuration;
    this.path = path;
    this.expiryStarted = false;
    this._token = token;
  }

  set token(tokenVal) {
    this._token = tokenVal;
  }

  get token() {
    return this._token;
  }

  check() {
    if (!this.path) throw new Error('No token path set.');

    if (!this.isTokenActive()) {
      this.reassignToken();
    }

    // Is the token currently active
    if (token) return;

    this.assignUserToken();
  }

  reassignToken() {
    expiry = 0;
    token = undefined;
    this.token = undefined;
    this.expiryStarted = false;
  }

  isTokenActive() {
    return expiry < this.expiryDuration;
  }

  getUserToken() {
    return fetch(this.path);
  }

  assignUserToken() {
    this.getUserToken().then(response => {
      token = response;
      this.token = token;

      this.startExpiryTimer();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  startExpiryTimer() {
    setInterval(() => {
      expiry += 1;
    }, 1000);
    this.expiryStarted = true;
  }
}

export default TokenManager;
