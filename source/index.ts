import app from "./app";
import "./database";
import serverless from 'serverless-http'

app.listen(app.get("port"), () => {
  console.log("server con puerto", app.get("port"));
});

module.exports.handler = serverless(app)