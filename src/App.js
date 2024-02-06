import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [emailError, setEmailError] = useState("");
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    // Регулярное выражение для проверки формата email
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Проверка формата email перед отправкой
    if (!validateEmail(formData.email)) {
      setEmailError("Некорректный формат email");
      return;
    }

    // Отправка данных на сервер
    axios
      .post("/form", formData)
      .then(() => {
        setSuccessModalIsOpen(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setEmailError(""); // Очистка сообщения об ошибке после успешной отправки
      })
      .catch((error) => {
        console.error("Ошибка отправки сообщения:", error);
        setErrorModalIsOpen(true);
      });
  };

  return (
    <div>
      <h1>Отправить данные в Телеграмм</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"><p>Имя:</p></label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email"><p>Email:</p></label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <br />
        <label htmlFor="message"><p>Сообщение:</p></label>
        <br />
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Отправить</button>
      </form>

      {/* Модальное окно при успешной отправке */}
      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={() => setSuccessModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "1rem",
            maxWidth: "20rem",
            maxHeight: "15rem",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          },
        }}
      >
        <h2>Сообщение успешно отправлено!</h2>
        <button onClick={() => setSuccessModalIsOpen(false)}>Закрыть</button>
      </Modal>

      {/* Модальное окно при неудачной отправке */}
      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={() => setErrorModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "20px",
            maxWidth: "400px",
          },
        }}
      >
        <h2>Произошла ошибка при отправке сообщения!</h2>
        <button onClick={() => setErrorModalIsOpen(false)}>Закрыть</button>
      </Modal>
    </div>
  );
};

export default App;
