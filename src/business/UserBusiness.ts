import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { InvalidParameterError } from "../error/InvalidParameterError"
import { NotFoundError } from "../error/NotFoundError";

export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {}

    async registerUser(user: UserInputDTO): Promise<string> {

        if (!user.name || !user.nickname || !user.email || !user.password) {
            throw new InvalidParameterError("Missing input");
        }

        if (user.email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email");
        }

        if (user.password.length < 6) {
            throw new InvalidParameterError("Invalid password");
        }

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDatabase.registerUser(id, user.name, user.nickname, user.email, hashPassword);

        const accessToken = this.authenticator.generateToken({ id });

        return accessToken;
    }

    async getUserByEmailOrNickname(user: LoginInputDTO): Promise<string> {

        if (!user.emailOrNickname || !user.password) {
            throw new InvalidParameterError("Missing input");
        }

        const userFromDB = await this.userDatabase.getUserByEmailOrNickname(user.emailOrNickname);
        if (!userFromDB) {
            throw new NotFoundError("User not found")
        }
        
        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        if (!hashCompare) {
            throw new InvalidParameterError("Invalid Password!");
        }
        
        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId() });

        return accessToken;
    }
}