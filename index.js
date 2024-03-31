import { log } from "console";
import express from "express";
import fs from "fs";
import path from "path";
const server = express();

const value = JSON.parse(fs.readFileSync("datas.json", "utf-8"));
const datas = value.datas;
// const data = fs.readFileSync("data.js", "utf8", (err, item) => {
//   console.log(item).data;
// });
const port = 7000;

server.use(express.json());
server.use(express.static("public"));

// Middlewares and practice the concept
// server.use((req, res, next) => {
//   console.log(
//     req.method,
//     req.ip,
//     req.hostname,
//     new Date(),
//     req.get("user-Agent")
//   );
//   next();
// });

// const auth = (req, res, next) => {
//   console.log(req.params);
//   next();
// };
// const auth = (req, res, next) => {
//   console.log(req.query);
//   if (req.query.name == "gajju") {
//     res.end(req.query.name);
//     next();
//   } else if (req.query.age == "22") {
//     next();
//   } else if (req.query.subject == "maths") {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// };

// server.use(auth);

// REST API (post,put,patch,delete,get)
server.post("/datas", (req, res) => {
  console.log(req.body);
  datas.push(req.body);
  res.sendStatus(201).json();
});

server.put("/datas/:id", (req, res) => {
  const id = +req.params.id;
  const dataindex = datas.findIndex((p) => p.id === id);
  datas.splice(dataindex, 1, { ...req.body, id: id });
  res.sendStatus(201).json();
});

server.patch("/datas/:id", (req, res) => {
  const id = +req.params.id;
  const dataindex = datas.findIndex((p) => p.id === id);
  let data = datas[dataindex];
  datas.splice(dataindex, 1, { ...data, ...req.body });
  res.sendStatus(201).json();
});

server.delete("/datas/:id", (req, res) => {
  const id = +req.params.id;
  const dataindex = datas.findIndex((p) => p.id === id);
  let data = datas[dataindex];
  datas.splice(dataindex, 1);
  res.status(201).json(data);
});

server.get("/", (req, res) => {
  res.json(datas);
});

server.get("/datas/:id", (req, res) => {
  const id = +req.params.id;
  // console.log(id);
  const data = datas.find((p) => p.id === id);
  res.json(data);
});

server.listen(port, () => {
  console.log(`server started at port ${port}`);
});
