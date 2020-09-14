import moment from "moment";

export class Music {
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: moment.Moment = moment("DD/MM/YYYY"),
        private file: string,
        private album: string,
        private musicCreatorId: string,
        private genres: string[]
    ) {}

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getDate() {
        return this.date;
    }

    getFile() {
        return this.file;
    }

    getAlbum() {
        return this.album;
    }

    getGenres() {
        return this.genres
    }

    getCreatorId() {
        return this.musicCreatorId;
    }

    setGenres(genres: string[]) {
        this.genres = genres;
    }

    static toMusicModel(music: any): Music {
        return new Music (
            music.id, 
            music.title, 
            music.author, 
            music.date, 
            music.file,
            music.album,
            music.musicCreatorId,
            music.genres
        );
    }

}

export interface MusicInputDTO {
    title: string,
    author: string,
    date: moment.Moment,
    file: string,
    album: string,
    genres: string[]
}

export interface MusicOutputDTO {
    id: string,
    title: string,
    author: string,
    date: moment.Moment,
    file: string,
    album: string,
    musicCreatorId: string,
    genres: string[]
}
