import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';


const app = express();

app.use(cors({
}));

app.use(json());
console.log('Allowing CORS for origin:', process.env.FRONTEND_URL);
const dynomodbClient = new DynamoDBClient ({ 
  region : process.env.AWS_REGION,
  credentials : {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
  }
 });
const docClient = DynamoDBDocumentClient.from(dynomodbClient);

const getPublicImageUrl = (s3Url) => {

  const bucketName = 'itemshowcase';
  const region = 'us-west-1';

  let path = s3Url.replace(`s3://${bucketName}/`, '');

  const bucketPrefix = `${bucketName}/`;
  if (path.startsWith(bucketPrefix)) {
    path = path.slice(bucketPrefix.length);
  }

  return `https://${bucketName}.s3.${region}.amazonaws.com/${path}`;
};

app.get('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const { Item } = await docClient.send(new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id }   // partition key
    }));
    if (!Item) return res.status(404).send('Product not found');
    Item.slides = Item.slides?.map(getPublicImageUrl) ?? [];
    Item.imageURL = getPublicImageUrl(Item.imageURL);
    
    res.json(Item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: process.env.TABLE_NAME }));
    const products = data.Items.map(item => ({
      ...item,
      imageURL: getPublicImageUrl(item.imageURL),
    }));
    res.json(products);
  } catch (err) {
    console.error('DynamoDB error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});



app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
