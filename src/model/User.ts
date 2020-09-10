export class User{
    constructor(
    private id: string,
    private name: string,
    private email: string,
    private nickname: string,
    private password: string
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getNickname(){
        return this.nickname;
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.email, user.nickname, user.password);
    }

}

export interface UserInputDTO{
    email: string;
    name: string;
    nickname: string;
    password: string;
}

export interface LoginInputDTO{
    email: string;
    password: string;
}
