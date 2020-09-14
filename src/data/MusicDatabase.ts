import moment from "moment";
import { BaseDatabase } from "./base/BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Music, MusicOutputDTO } from "../model/Music";

export class MusicDatabase extends BaseDatabase {
    
  public async createMusic (
    id: string,
    title: string,
    author: string,
    date: moment.Moment,
    file: string,
    album: string,
    genres: string[],
    creatorId: string
  ): Promise<void> {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const idGenerator = new IdGenerator();

    try {
      await this.getConnection()
        .insert({
          id,
          title,
          author,
          date: formattedDate,
          file,
          album,
          music_creator_id: creatorId
        })
        .into(this.tableNames.musics);

        for (let genre of genres) {
          let genreId = idGenerator.generate();

          await this.getConnection()
            .insert({
              id: genreId,
              name: genre,
            })
            .into(this.tableNames.genres);

          await this.getConnection()
            .insert({
              music_id: id,
              genre_id: genreId
            })
            .into(this.tableNames.musicGenreRelation)
        }

    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getAllMusic(creatorId: string): Promise<Music[]> {
    try {
      
      const musics = await this.getConnection().raw(`
        SELECT * FROM ${this.tableNames.musics}
        WHERE music_creator_id = "${creatorId}"
      `)

      musics[0].forEach((music: any) => {
        music.date = moment(music.date).format("DD/MM/YYYY")
      });

      const musicsAndGenres: Music[] = [];
      
      for (let item of musics[0]) {
        const musicGenres = await this.getConnection().raw(`
          SELECT g.genre
          FROM ${this.tableNames.genres} g
          JOIN ${this.tableNames.musicGenreRelation} mgr
          ON g.id = mgr.genre_id
          WHERE mgr.music_id = "${item.id}"
        `);

        const genres: string[] = [];
        for (let genre of musicGenres[0]) {
          genres.push(genre.genre)
        };

        const output: MusicOutputDTO = {
          id: item.id,
          title: item.title,
          author: item.author,
          date: item.date,
          file: item.file,
          album: item.album,
          musicCreatorId: item.music_creator_id,
          genres: genres
        };

        musicsAndGenres.push(Music.toMusicModel(output));

      };

      return musicsAndGenres;
    
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getMusicById(musicId:string, creatorId: string): Promise<Music[]> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableNames.musics)
        .where({ 
          id: musicId,
          music_creator_id: creatorId 
        })

      result.map((music: any) => {
        music.date = moment(music.date).format("DD/MM/YYYY")
      });

      const musicsAndGenres: Music[] = [];
      
      for (let item of result) {
        const musicGenres = await this.getConnection().raw(`
          SELECT g.genre
          FROM ${this.tableNames.genres} g
          JOIN ${this.tableNames.musicGenreRelation} mgr
          ON g.id = mgr.genre_id
          WHERE mgr.music_id = "${item.id}"
        `);

        const genres: string[] = [];
        for (let genre of musicGenres[0]) {
          genres.push(genre.genre)
        };

        const output: MusicOutputDTO = {
          id: item.id,
          title: item.title,
          author: item.author,
          date: item.date,
          file: item.file,
          album: item.album,
          musicCreatorId: item.music_creator_id,
          genres: genres
        };

        musicsAndGenres.push(Music.toMusicModel(output));

      };

      return musicsAndGenres;

      //return Music.toMusicModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}