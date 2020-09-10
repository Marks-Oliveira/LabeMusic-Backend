import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
//import { InvalidParameterError } from "../error/"

export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {}

    async registerUser(user: UserInputDTO) {

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDatabase.registerUser(id, user.name, user.email, user.nickname, hashPassword);

        const accessToken = this.authenticator.generateToken({ id });

        return accessToken;
    }

    //async getUserByEmail(user: LoginInputDTO) {

    //    const userDatabase = new UserDatabase();
    //    const userFromDB = await userDatabase.getUserByEmail(user.email);

    //    const hashManager = new HashManager();
    //    const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

    //    const authenticator = new Authenticator();
    //    const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

    //    if (!hashCompare) {
    //        throw new Error("Invalid Password!");
    //    }

    //    return accessToken;
    //}
}