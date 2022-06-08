const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const htmlToPdf = require("html-pdf-node");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ejs = require("ejs");
const cors = require("cors");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/pdf", async function (req, res) {
  const rows = [
    { id: 1, first_name: "a", last_name: "aa" },
    { id: 2, first_name: "b", last_name: "ba" },
    { id: 3, first_name: "n", last_name: "nma" },
  ];

  const tableHtml = await ejs.renderFile(
    "./views/table.html.ejs",
    { rows },
    { async: true }
  );
  const html = await ejs.renderFile(
    "./views/layout.html.ejs",
    { body: tableHtml },
    { async: true }
  );
  let options = {
    format: "A4",
    margin: { top: 15, left: 10, right: 10, bottom: 15 },
  };
  let file = { content: html };
  htmlToPdf
    .generatePdf(file, options)
    .then((pdfBuffer) => {
      res
        .writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment",
        })
        .end(pdfBuffer);
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
});

app.post("/pdf", async function (req, res) {
  const tableHtml = await ejs.renderFile(
    "./views/table.html.ejs",
    { rows: req.body.rows },
    { async: true }
  );
  const html = await ejs.renderFile(
    "./views/layout.html.ejs",
    { body: tableHtml },
    { async: true }
  );
  let options = {
    format: "A4",
    margin: { top: 15, left: 10, right: 10, bottom: 15 },
  };
  let file = { content: html };
  htmlToPdf
    .generatePdf(file, options)
    .then((pdfBuffer) => {
      res
        .writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment",
        })
        .end(pdfBuffer);
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
