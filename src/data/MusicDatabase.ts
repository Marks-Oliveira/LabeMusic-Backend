import moment from "moment";
import { BaseDatabase } from "./base/BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";

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
    const formattedDate = moment(date).format("YYYY/MM/DD");
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
}