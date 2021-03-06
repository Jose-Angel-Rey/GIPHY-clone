import { Request, Response } from "express";
import { Router } from "express";
import axios from "axios";

const stickers = Router();

stickers.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const url = `https://api.giphy.com/v1/stickers/trending?api_key=${process.env.API_KEY}`;

    try {
      const response = await axios.get(url);

      const data = await response.data;

      const gifData = data.data.map((gif: any) => {
        return {
          id: gif.id,
          title: gif.title,
          images: {
            large: gif.images.fixed_height.webp,
            medium: gif.images.preview_webp.url,
          },
        };
      });

      const responseData = {
        gifs: gifData,
        pagination: data.pagination,
      };

      return res.status(200).json(responseData);
    } catch (error: unknown) {
      return res.status(500).json(error);
    }
  }
);

export default stickers;
