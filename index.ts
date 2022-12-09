import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import pg_promise from "pg-promise";
import moment from "moment";

dotenvExpand.expand(dotenv.config());

const app: Express = express();
const port = process.env.PORT;

let counter = 0;

const pg = pg_promise();
const databaseUrl = process.env.ITMO_TASK_DATABASE_URL ?? "";
const pg_database = pg(databaseUrl);

const addCounterInfo = (
  counter: number,
  userAgent: string,
) => {
  const date = moment().toISOString();

  return pg_database.query(
    `INSERT INTO counters(datetime, client_info, value)
     VALUES ('${date}', '${userAgent}', '${counter}')`,
    [date, userAgent, counter]);
}

app.get("/", (req: Request, res: Response) => {
  const userAgent = req.header("User-Agent") ?? "";

  addCounterInfo(counter, userAgent)
    .then(() => res.end(JSON.stringify(counter)));
});

app.get("/stat", (req: Request, res: Response) => {
  const userAgent = req.header("User-Agent") ?? "";

  addCounterInfo(++counter, userAgent)
    .then(() => res.end(JSON.stringify(counter)));
});

app.get("/about", (_, res: Response) => {
  const name = "Liza Bakulina";
  const html = `<h3>Hello, ${name}!</h3>`;

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`);
});
