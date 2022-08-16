import { dataFunction } from '@/helpers/dataFunction';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Something went wrong, ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
  const { file, page, filter } = req.body;

  const { resultArray, numPages } = dataFunction(file, page, filter);
  res.status(200).json({ data: resultArray, pages: numPages });
});

export default apiRoute;
