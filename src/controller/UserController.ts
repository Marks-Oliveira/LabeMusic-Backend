import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserController {
    private static UserBusiness = new UserBusiness (
        new UserDatabase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator(),
    )

    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const accessToken = await UserController.UserBusiness.registerUser(input);

            res.status(200).send({ accessToken });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                emailOrNickname: req.body.emailOrNickname,
                password: req.body.password
            };

            const accessToken = await UserController.UserBusiness.getUserByEmailOrNickname(loginData);

            res.status(200).send({ accessToken });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}