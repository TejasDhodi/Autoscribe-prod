import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const encodedToken = Buffer.from(process.env.PIXELBIN_API_KEY!).toString('base64');
  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ error: 'Failed to parse form data' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const folder = Array.isArray(fields.folder) ? fields.folder[0] : fields.folder || 'default';

    const formData = new FormData();
    if(file) formData.append('file', fs.createReadStream(file.filepath));
    formData.append('cloudName', process.env.PIXELBIN_CLOUD_NAME!);
    formData.append('path', folder);

    try {
      const uploadRes = await axios.post('https://api.pixelbin.io/service/platform/assets/v1.0/upload/direct', formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${encodedToken}`,
        },
        maxRedirects: 0, 
        validateStatus: (status) => status < 400 || status === 307,
      });

      // return res.status(200).json({ url: uploadRes.data.url, headers: formData.getHeaders() });
      if (uploadRes.status === 307) {
        const redirectUrl = uploadRes.headers.location;
        const finalRes = await axios.post(redirectUrl, formData, {
          headers: formData.getHeaders(),
        });
      
        return res.status(200).json({ url: finalRes.data.url });
      } else {
        return res.status(200).json({ url: uploadRes.data.url });
      }
    } catch (uploadErr: any) {
      console.error('PixelBin Upload Error:', uploadErr.response?.data || uploadErr.message);
      return res.status(500).json({ error: uploadErr.response?.data || uploadErr.message, msg: 'Upload failed' });
    }
  });
}
