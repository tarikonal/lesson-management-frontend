import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
    id: any;
    username: any;
    password: any;
    fullname: any;
    email: any;
    pic: any;
    roles: number[] = [];
    occupation: any;
    companyName: any;
    phone: any;
    // personal information
    firstname: any;
    lastname: any;
    website: any;
    // account information
    language: any;
    timeZone: any;

    setUser(_user: unknown) {
        const user = _user as UserModel;
        this.id = user.id;
        this.username = user.username || '';
        this.password = user.password || '';
        this.fullname = user.fullname || '';
        this.email = user.email || '';
        this.pic = user.pic || './assets/media/users/default.jpg';
        this.roles = user.roles || [];
        this.occupation = user.occupation || '';
        this.companyName = user.companyName || '';
        this.phone = user.phone || '';
    }
}
