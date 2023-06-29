import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


const requestHandler = async(req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "GET":
        const { data: requestData } = await axios.get(`${process.env.API_SECRET_URL}/request/accept`)
        res.status(200).json(requestData);

      default:
        break;
    }
};

export default requestHandler;
