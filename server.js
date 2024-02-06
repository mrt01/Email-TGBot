const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = 3001;

const telegramBotToken = "6217160437:AAE_J1ro2h53C2wFF0nkABsGLVcxq_OesRg";
const telegramChatId = "489033397";

// Создание эк бота
const bot = new TelegramBot(telegramBotToken);

// Добавление middleware для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Обработка запроса на отправку формы
app.post("/form", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  console.log(`${name}, ${email}, ${message}`);

  const text = `Новое сообщение из формы на сайте:\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`;

  // Отправка сообщения в телегу
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

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
