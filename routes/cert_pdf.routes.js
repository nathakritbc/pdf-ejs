const express = require("express");
const router = express.Router();
const htmlToPdf = require("html-pdf-node");

const ejs = require("ejs");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("cert_pdf", { title: "Express" });

  // let options = { format: "A4" };
  // // let file = { content: "<h1>Welcome to html-pdf-node</h1>" };

  // const html = await ejs.renderFile("./views/cert_pdf.ejs");

  // let file = { content: html };
  // htmlToPdf
  //   .generatePdf(file, options)
  //   .then((pdfBuffer) => {
  //     res
  //       .writeHead(200, {
  //         "Content-Type": "application/pdf",
  //         "Content-Disposition": "attachment",
  //       })
  //       .end(pdfBuffer);
  //   })
  //   .catch((err) => {
  //     res.send({ success: false, error: err });
  // });
});

module.exports = router;
