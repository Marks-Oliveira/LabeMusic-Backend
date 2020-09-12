import { BaseDatabase } from "./base/BaseDatabase";
import { User } from "../model/User";
import { NotFoundError } from "../error/NotFoundError";

export class UserDatabase extends BaseDatabase {

  public async registerUser(
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          nickname,
          email,
          password
        })
        .into(this.tableNames.users);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmailOrNickname(emailOrNickname: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.users)
        .where({ email: emailOrNickname })     
        .or.where({ nickname: emailOrNickname });

        return User.toUserModel(result[0]);  
      
    } catch (error) {
      throw new NotFoundError(error.sqlMessage || "User not found");
    }
  }

}
