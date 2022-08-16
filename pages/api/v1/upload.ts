import { randomUUID } from 'crypto';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
};

let filename = randomUUID() + '-' + new Date().getTime();
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // destination folder
    filename: (req, file, cb) => cb(null, addFileExtension(file)),
  }),
});

const addFileExtension = (file: { originalname: string }) => {
  filename += '.' + file.originalname.substring(file.originalname.lastIndexOf('.') + 1, file.originalname.length);
  return filename;
};

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Something went wrong, ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

// Multer Middleware
apiRoute.use(upload.array('file'));

apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ filename: `uploads/${filename}` });
});

export default apiRoute;
