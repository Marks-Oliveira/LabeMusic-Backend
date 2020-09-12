import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { MusicInputDTO } from "../model/Music";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { GenericError } from "../error/GenericError";

export class MusicBusiness {
    constructor (
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}
    
    async createMusic(token: string, music: MusicInputDTO) {
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

}