import express, { Express } from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicPath = path.join(path.resolve(), 'public');

const app: Express = express();

app.use('/', express.static(publicPath));

app.get('/*', (_req, res) => {
  res.sendFile(`${path.parse(path.parse(__dirname).dir).dir}/src/index.html`);
});

const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
