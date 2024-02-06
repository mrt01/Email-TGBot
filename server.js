const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors"); // Добавлено

const app = express();
const port = 3001;

const telegramBotToken = "ваш_токен";
const telegramChatId = "ваш_chat_id";

const bot = new TelegramBot(telegramBotToken);

app.use(cors()); // Добавлено

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/form", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  console.log(`${name}, ${email}, ${message}`);

  const text = `Новое сообщение из формы на сайте:\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`;

  bot
    .sendMessage(telegramChatId, text)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Ошибка отправки сообщения в телеграмм:", error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
