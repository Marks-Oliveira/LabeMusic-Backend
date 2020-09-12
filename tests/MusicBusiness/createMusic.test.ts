import moment from "moment";
import { MusicBusiness } from "../../src/business/MusicBusiness";
import { MusicInputDTO, Music } from "../../src/model/Music";

describe("Testing createMusic on the Business layer", () => {
    let musicDatabase = {

    };
    let idGenerator = {
        generate: jest.fn(() => "id")
    };
    let authenticator = {

    };
    /*
    test("Should return an error when receiving empty token", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        const input: MusicInputDTO = {
            title: "Dias melhores",
            author: "Jota Quest",
            date: moment("22/06/2000", "DD/MM/YYYY"),
            file: "Dias-melhores.mp3",
            album: "Oxigênio",
            genres:["Pop", "Rock"]
        };

        try {
            await musicBusiness.createMusic("", input);
        } catch (error) {
            expect(error.code).toBe(400);
            expect(error.message).toEqual("User must be logged");
        }
    });
    
    test("Should return an error when receiving empty title", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        const input: MusicInputDTO = {
            title: "",
            author: "Jota Quest",
            date: moment("22/06/2000", "DD/MM/YYYY"),
            file: "Dias-melhores.mp3",
            album: "Oxigênio",
            genres:["Pop", "Rock"]
        };

        try {
            await musicBusiness.createMusic("token", input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    
    test("Should return an error when receiving empty author", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        const input: MusicInputDTO = {
            title: "Dias melhores",
            author: "",
            date: moment("22/06/2000", "DD/MM/YYYY"),
            file: "Dias-melhores.mp3",
            album: "Oxigênio",
            genres:["Pop", "Rock"]
        };

        try {
            await musicBusiness.createMusic("token", input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    
    test("Should return an error when receiving empty date", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        const input: MusicInputDTO = {
            title: "Dias melhores",
            author: "",
            date: moment(""),
            file: "Dias-melhores.mp3",
            album: "Oxigênio",
            genres:["Pop", "Rock"]
        };

        try {
            await musicBusiness.createMusic("token", input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    
    test("Should return an error when receiving empty file", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        const input: MusicInputDTO = {
            title: "Dias melhores",
            author: "Jota Quest",
            date: moment("22/06/2000", "DD/MM/YYYY"),
            file: "",
            album: "Oxigênio",
            genres:["Pop", "Rock"]
        };

        try {
            await musicBusiness.createMusic("token", input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });

    test("Should return an error when receiving empty album", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        const input: MusicInputDTO = {
            title: "Dias melhores",
            author: "Jota Quest",
            date: moment("22/06/2000", "DD/MM/YYYY"),
            file: "Dias-melhores.mp3",
            album: "",
            genres:["Pop", "Rock"]
        };

        try {
            await musicBusiness.createMusic("token", input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    
    test("Should return an error when receiving empty genres", async () => {
        expect.assertions(2);

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        const input: MusicInputDTO = {
            title: "Dias melhores",
            author: "",
            date: moment("22/06/2000", "DD/MM/YYYY"),
            file: "Dias-melhores.mp3",
            album: "Oxigênio",
            genres:[""]
        };

        try {
            await musicBusiness.createMusic("token", input);
        } catch (error) {
            expect(error.code).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    });
    */
    test("User must succeed when registering a music", async () => {
        expect.assertions(4);

        let getData = jest.fn(() => { return { id: "creatorId" } });
        let createMusic = jest.fn((music: Music) => {})

        musicDatabase = {createMusic};
        authenticator = {getData};

        const musicBusiness = new MusicBusiness(
            musicDatabase as any,
            idGenerator as any,
            authenticator as any
        );

        const input: MusicInputDTO = {
            title: "Dias melhores",
            author: "Jota Quest",
            date: moment("22/06/2000", "DD/MM/YYYY"),
            file: "Dias-melhores.mp3",
            album: "Oxigênio",
            genres:["Pop", "Rock"]
        };

        await musicBusiness.createMusic("token", input);
        
        expect(getData).toBeCalled();
        expect(getData).toBeCalledTimes(1)
        expect(getData).toBeCalledWith("token")
        expect(createMusic).toHaveBeenCalledWith(
            "id", 
            "Dias melhores", 
            "Jota Quest", 
            moment("22/06/2000", "DD/MM/YYYY"),
            "Dias-melhores.mp3",
            "Oxigênio",
            ["Pop", "Rock"],
            "creatorId"
        );
        
    });
});