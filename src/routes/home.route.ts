import express from "express";
const router = express.Router();
router.get("", (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('<html> <body> <h1> Welcome to GCC Student Portal Server v0.1 </h1> <p> Development ver: 0.1<br> Production ver: 0.1<br> Node ver: 22<br> Lang: TS </body> </html>');
    res.end();
  } catch (err) {
    res.send(err);
  }
});

export default router;
