import moment from "moment";
import { MusicBusiness } from "../../src/business/MusicBusiness";
import { Music } from "../../src/model/Music";

describe("Testing getMusicById on the Business layer", () => {

    let musicDatabase = {

    };
    let idGenerator = {
        generate: jest.fn(() => "id")
    };
    let authenticator = {

    };

    test("Should return an error when receiving empty musicId", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        try {
            await musicBusiness.getMusicById("", "token");
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    
    test("Should return an error when receiving empty token", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        try {
            await musicBusiness.getMusicById("musicId", "");
        } catch (error) {
            expect(error.code).toBe(400);
            expect(error.message).toEqual("User must be logged");
        }
    });

    test("Should return a music when the user enters an id", async () => {

        expect.assertions(4);

        let getData = jest.fn(() => { return { id: "creatorId" } });
        let getMusicById = jest.fn((musicId: string, token: string) => {
            return new Music(
                "id", 
                "Surto de Amor",
                "Bruno & Marrone, Jorge & Mateus", 
                moment("10/10/2019", "DD/MM/YYYY"), 
                "Surto-de-amor.mp3",
                "Studio Bar - Live", 
                "creatorId",
                ["Sertanejo", "Sertanejo universitário"]
            );
        });

        musicDatabase = {getMusicById};
        authenticator = {getData};

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        await musicBusiness.getMusicById("musicId", "creatorId");

        expect(getData).toBeCalled();
        expect(getData).toBeCalledTimes(1)
        expect(getData).toBeCalledWith("creatorId")
        expect(getMusicById).toHaveReturnedWith(
            new Music (
                "id", 
                "Surto de Amor",
                "Bruno & Marrone, Jorge & Mateus", 
                moment("10/10/2019", "DD/MM/YYYY"), 
                "Surto-de-amor.mp3",
                "Studio Bar - Live", 
                "creatorId",
                ["Sertanejo", "Sertanejo universitário"]
            )
        )
    });
    
});