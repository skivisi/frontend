import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


const requestHandler = async(req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "GET":
        const { data: userData } = await axios.get(`http://localhost:8080/user`)
        res.status(200).json(userData);
        console.log(userData)
      
        
      default:
        res.status(405).end();
        break;
    }
};

export default requestHandler;
