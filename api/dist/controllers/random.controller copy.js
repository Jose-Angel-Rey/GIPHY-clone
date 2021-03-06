"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const random = (0, express_1.Router)();
random.get("/", (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${"rocket"}`;
    try {
        const response = yield axios_1.default.get(url);
        const { data } = yield response.data;
        const gifData = {
            id: data.id,
            title: data.title,
            rating: data.rating,
            images: {
                large: data.images.downsized_large.url,
                medium: data.images.fixed_height.url,
            },
            user: Object.assign({}, data.user),
        };
        return res.status(200).json(gifData);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
exports.default = random;
