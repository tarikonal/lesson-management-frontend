export class AuthModel {
  authToken: any;
  refreshToken:any;
  expiresIn: any;

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}
