import express from "express";
import Quote from "../models/Quote.js";
import jwt from "jsonwebtoken";
import { JWTsecret } from "../config.js";
import Cookies from "cookies";

const router = express.Router();

// Route to get ALL quotes from database
router.get('/', async (request, response) => {
    try {
        const quotes = await Quote.find({});
        return response.status(200).json({
            count: quotes.length,
            data: quotes
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router