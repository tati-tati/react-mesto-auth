import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip ";
import { checkToken, logIn, register } from "../utils/AuthApi";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isAccessPopupOpen, setAccessPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      checkToken()
        .then((res) => {
          if (res && typeof res === "object") {
            setLoggedIn(true);
            // console.log(res);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        // console.log(res);
        setCards(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

    api
      .getInfoUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [loggedIn]);

  function handleUpdateUser(user) {
    // console.log(user);
    api
      .setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id === card._id ? "" : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleImagePopupOpen(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setAccessPopupOpen(false);
  }

  function handleRegisterSubmit({ password, email }) {
    console.log(password, email);
    register(password, email)
      .then((res) => {
        if (res !== false) {
          navigate("/sign-in", { replace: true });
          setStatus(true);
          setMessage("Вы успешно зарегистрировались!");
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
        setMessage("Что-то пошло не так! Попробуйте еще раз.");
      })
      .finally(() => {
        setAccessPopupOpen(true);
      });
  }

  function handleLogInSubmit({ password, email }) {
    logIn(password, email)
      .then((res) => {
        // console.log("handleSubmitApi", res);
        if (res !== false) {
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/", { replace: true });
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
        setMessage("Что-то пошло не так! Попробуйте еще раз.");
        setAccessPopupOpen(true);
      });
  }

  function handleExit() {
    setUserEmail("");
    localStorage.removeItem("jwt");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} handleExit={handleExit} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                setSelectedCard={handleImagePopupOpen}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register handleRegisterSubmit={handleRegisterSubmit} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogInSubmit={handleLogInSubmit} />}
          />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isAccessPopupOpen}
          onClose={closeAllPopups}
          status={status}
          message={message}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          class={"popup_edit-confirm"}
          onClose={closeAllPopups}
          form={"form_confirm"}
          titleModificator={"popup__title_padding_small"}
          title={"Вы уверены?"}
          buttonModificator={"popup__save-button_nomargin"}
          buttonText={"Да"}
        ></PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
