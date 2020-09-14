import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { Music, MusicInputDTO } from "../model/Music";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { GenericError } from "../error/GenericError";

export class MusicBusiness {
    constructor (
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}
    
    async createMusic(token: string, music: MusicInputDTO): Promise<void> {
        if (!token) {
            throw new GenericError("User must be logged");
        }

        if (
            !music.title || 
            !music.author || 
            !music.date || 
            !music.file ||
            !music.album ||
            !music.genres
        ) {
            throw new InvalidParameterError("Missing input");
        }

        const musicId = this.idGenerator.generate();

        const creatorId = this.authenticator.getData(token)

        await this.musicDatabase.createMusic (
            musicId, 
            music.title, 
            music.author, 
            music.date, 
            music.file,
            music.album,
            music.genres,
            creatorId.id
        );

    }

    async getAllMusic(token: string): Promise<Music[]> {
        if (!token) {
            throw new GenericError("User must be logged");
        }

        const accessToken = this.authenticator.getData(token);

        const allMusic = await this.musicDatabase.getAllMusic(accessToken.id);
    
        return allMusic;
    }

    async getMusicById(musicId: string, token: string): Promise<Music[]> {
        if (!musicId) {
            throw new InvalidParameterError("Missing input");
        }
        
        if (!token) {
            throw new GenericError("User must be logged");
        }

        const accessToken = this.authenticator.getData(token)

        return await this.musicDatabase.getMusicById(musicId, accessToken.id)
    }

}