import express from "express";
const app = express();

app.use((req, res, next) => {
    console.log("Метод", req.method);
    console.log("Адрес", req.url);
    console.log("Код", res.statusCode);
    console.log("-------------");
    next();
});
app.use(express.static("public"));

app.use(express.json());


app.post("/send", (req, res) => {
  res.statusCode = 400;


  if (req.header("Content-Type") != "application/json") {
    
    let data = {
      status: "error",
      message: "Неверный тип данных",
    };
    res.send(data);
  }
  else if (req.body.telephone == undefined) {
    let data = {
      status: "error",
      message: "Нужен телефон",
    };
    res.send(data);
  }
  else if (req.body.plastic == undefined) {

    let data = {
      status: "error",
      message: "Нужен пластик",
    };

    res.send(data);
  }
  else if (req.body.height != undefined) {
    let days = parseInt(req.body.height);
    if (isNaN(days)) {

      let data = {
        status: "error",
        message: "Высота не число",
      };

      res.send(data);
      return;
    }
  }
  else if (req.body.urgently != undefined && typeof(req.body.urgently) !== "boolean") {

    
    data.message = "Неверное поле срочность";

    res.send(data);
    return;
  }
  
    let answer = {
      status: "ok",
      telephone: req.body.telephone,
      plastic: req.body.plastic,
      height: req.body.height,
      urgently: req.body.urgently
    };
    res.statusCode = 200;

    res.send(answer);
  
});

let port = 5500;
app.listen(port, () => console.log(`Server started at port ${port}`));
