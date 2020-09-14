import { Request, Response } from "express";
import moment from "moment";
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { MusicInputDTO } from "../model/Music";
import { BaseDatabase } from "../data/base/BaseDatabase";

export class MusicController {
    private static MusicBusiness = new MusicBusiness (
        new MusicDatabase(),
        new IdGenerator(),
        new Authenticator()
    )

    async createMusic(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string;

            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                date: moment(req.body.date, "DD/MM/YYYY"),
                file: req.body.file,
                album: req.body.album,
                genres: req.body.genre
            };

            await MusicController.MusicBusiness.createMusic(token, input);

            res.status(200).send({ message: "Music created successfully!" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getAllMusic(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const result = await MusicController.MusicBusiness.getAllMusic(token);

            res.status(200).send({ musics: result })
        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getMusicById(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const musicId = req.params.id

            const result = await MusicController.MusicBusiness.getMusicById(musicId ,token);

            res.status(200).send({ music: result })
        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}