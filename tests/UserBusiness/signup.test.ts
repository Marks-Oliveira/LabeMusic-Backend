import { UserBusiness } from "../../src/business/UserBusiness";
import { User, UserInputDTO } from "../../src/model/User";

describe("Testing signup on the Business layer", () => {

    let userDatabase = {

    };
    let idGenerator = {
        generate: jest.fn(() => "id")
    }
    let hashManager = {
        hash: jest.fn(() => "hash")
    };
    let authenticator = {
        generateToken: jest.fn(() => "token")
    };
    
    test("Should return an error when receiving empty name", async () => {
        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: UserInputDTO = {
            name: "",
            nickname: "marks",
            email: "marcos@dev.com",
            password: "123456"
        };

        try {
            await userBusiness.registerUser(input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    /*
    test("Should return an error when receiving empty nickname", async () => {
        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: UserInputDTO = {
            name: "Marcos Oliveira",
            nickname: "",
            email: "marcos@dev.com",
            password: "123456"
        };

        try {
            await userBusiness.registerUser(input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    
    test("Should return an error when receiving empty email", async () => {
        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: UserInputDTO = {
            name: "Marcos Oliveira",
            nickname: "marks",
            email: "",
            password: "123456"
        };

        try {
            await userBusiness.registerUser(input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });

    test("Should return an error when receiving empty password", async () => {
        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: UserInputDTO = {
            name: "Marcos Oliveira",
            nickname: "marks",
            email: "marcos@dev.com",
            password: ""
        };

        try {
            await userBusiness.registerUser(input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    
    test("'Invalid email' error should be returned for an email without @", async () => {
        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: UserInputDTO = {
            name: "Marcos Oliveira",
            nickname: "marks",
            email: "marcosdev.com",
            password: "123456"
        };

        try {
            await userBusiness.registerUser(input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Invalid email");
        }
    });
    
    test("'Invalid password' error should be returned for a password of less than 6 characters", async () => {
        expect.assertions(2);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: UserInputDTO = {
            name: "Marcos Oliveira",
            nickname: "marks",
            email: "marcos@dev.com",
            password: "12345"
        };

        try {
            await userBusiness.registerUser(input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Invalid password");
        }
    });
    
    test("Should return access token after user creation", async () => {

        let registerUser = jest.fn((user: User) => {})

        userDatabase = {registerUser};

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        );

        const input: UserInputDTO = {
            name: "Marcos Oliveira",
            nickname: "marks",
            email: "marcos@dev.com",
            password: "123456"
        };

        await userBusiness.registerUser(input);

        expect(hashManager.hash).toBeCalled();
        expect(registerUser).toHaveBeenCalledWith(
            "id", 
            "Marcos Oliveira",
            "marks", 
            "marcos@dev.com", 
            "hash"
        );
        expect(authenticator.generateToken).toHaveReturnedWith("token");
    });
  */
}); 

