import { UserBusiness } from "../../src/business/UserBusiness";
import { User, LoginInputDTO } from "../../src/model/User";

describe("Testing login on the Business layer", () => {

    let userDatabase = {

    };
    let idGenerator = {

    };
    let hashManager = {

    };
    let authenticator = {
        generateToken: jest.fn(() => "token")
    };

    test("Should return an error when receiving empty email or nickname", async () => {
        expect.assertions(2);

        try {

            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerator as any,
                hashManager as any,
                authenticator as any
            );

            const input: LoginInputDTO = {
                emailOrNickname: "",
                password: "223344"
            };

            await userBusiness.getUserByEmailOrNickname(input);

        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    /*
    test("Should return an error when receiving empty password", async ()=>{
        expect.assertions(2);

        try {

            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerator as any,
                hashManager as any,
                authenticator as any
            );

            const input: LoginInputDTO = {
                emailOrNickname: "marcos@dev.com",
                password: ""
            };

            await userBusiness.getUserByEmailOrNickname(input);

        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    
    test("Should return error when the user is not found", async ()=>{
        expect.assertions(3);

        let getUserByEmailOrNickname = jest.fn((email: string) => {return undefined});

        try {

            userDatabase = {getUserByEmailOrNickname};

            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerator as any,
                hashManager as any,
                authenticator as any
            );

            const input: LoginInputDTO = {
                emailOrNickname: "marcos@dev.com",
                password: "223344"
            };

            await userBusiness.getUserByEmailOrNickname(input);

        } catch (error) {
            expect(getUserByEmailOrNickname).toHaveBeenCalledWith("marcos@dev.com");
            expect(error.code).toBe(404);
            expect(error.message).toEqual("User not found");
        }
    });
    
    test("Should return error when the user has entered the incorrect password", async () => {
        expect.assertions(4);

        let getUserByEmailOrNickname = jest.fn((emailOrNickname: string) => {
            return new User (
                "id", 
                "Marcos Oliveira",
                "marks",
                "marcos@dev.com",  
                "223344",
            );
        });

        let compare = jest.fn((password: string, userPassword: string) => false);

        try {
            userDatabase = {getUserByEmailOrNickname};
            hashManager = {compare};

            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerator as any,
                hashManager as any,
                authenticator as any
            );

            const input: LoginInputDTO = {
                emailOrNickname: "marcos@dev.com",
                password: "000000"
            };

            await userBusiness.getUserByEmailOrNickname(input);

        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Invalid Password!");
            expect(getUserByEmailOrNickname).toHaveBeenCalledWith("marcos@dev.com");
            expect(compare).toHaveBeenCalledWith("000000", "223344");
        }
    });
    
    test("Should return a token when email and password are correct", async () => {

        let getUserByEmailOrNickname = jest.fn((email: string) => {
            return new User("id", "Marcos Oliveira", "marks", "marcos@dev.com", "223344");
        });

        let compare = jest.fn((password: string, userPassword: string) => true);

        userDatabase = {getUserByEmailOrNickname};
        hashManager = {compare};

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: LoginInputDTO = {
            emailOrNickname: "marcos@dev.com",
            password: "223344"
        };

        await userBusiness.getUserByEmailOrNickname(input);

        expect(getUserByEmailOrNickname).toHaveBeenCalledWith("marcos@dev.com");
        expect(compare).toHaveBeenCalledWith("223344", "223344");
        expect(authenticator.generateToken).toHaveReturnedWith("token");
    });

    test("Should return a token when nickname and password are correct", async () => {

        let getUserByEmailOrNickname = jest.fn((email: string) => {
            return new User("id", "Marcos Oliveira", "marks", "marcos@dev.com", "223344");
        });

        let compare = jest.fn((password: string, userPassword: string) => true);

        userDatabase = {getUserByEmailOrNickname};
        hashManager = {compare};

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: LoginInputDTO = {
            emailOrNickname: "marks",
            password: "223344"
        };

        await userBusiness.getUserByEmailOrNickname(input);

        expect(getUserByEmailOrNickname).toHaveBeenCalledWith("marks");
        expect(compare).toHaveBeenCalledWith("223344", "223344");
        expect(authenticator.generateToken).toHaveReturnedWith("token");
    });
    */
}); 