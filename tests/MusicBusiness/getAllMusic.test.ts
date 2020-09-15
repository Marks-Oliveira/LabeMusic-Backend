import moment from "moment";
import { MusicBusiness } from "../../src/business/MusicBusiness";
import { Music } from "../../src/model/Music";

describe("Testing getAllMusic on the Business layer", () => {

    let musicDatabase = {

    };
    let idGenerator = {
        generate: jest.fn(() => "id")
    };
    let authenticator = {

    };

    test("Should return an error when receiving empty token", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        try {
            await musicBusiness.getAllMusic("");
        } catch (error) {
            expect(error.code).toBe(400);
            expect(error.message).toEqual("User must be logged");
        }
    });
    
    test("A list of all musics must be returned", async () => {

        expect.assertions(4);

        let getData = jest.fn(() => { return { id: "creatorId" } });
        let getAllMusic = jest.fn((token: string) => {
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

        musicDatabase = {getAllMusic};
        authenticator = {getData};

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        await musicBusiness.getAllMusic("creatorId");

        expect(getData).toBeCalled();
        expect(getData).toBeCalledTimes(1)
        expect(getData).toBeCalledWith("creatorId")
        expect(getAllMusic).toHaveReturnedWith(
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