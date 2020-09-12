export class User {
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string
    ) {}

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
        return new User(user.id, user.name, user.nickname, user.email, user.password);
    }

}

export interface UserInputDTO {
    name: string;
    nickname: string;
    email: string;
    password: string;
}

export interface LoginInputDTO {
    emailOrNickname: string;
    password: string;
}
