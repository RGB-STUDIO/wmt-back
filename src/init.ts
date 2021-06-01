import express, { Express } from 'express';
import cors from 'cors';

export default (app:Express) => {
    app.use(cors({
        origin: true,
    }));
    app.use(express.urlencoded({
        extended: true,
    }));

    app.use(express.json());

    return app;
};
