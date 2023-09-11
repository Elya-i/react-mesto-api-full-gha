import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from './ConfirmationPopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import successIcon from '../images/success.svg'
import failIcon from '../images/fail.svg'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen ] = useState(false);
  
  const [isEditProfilePopupLoading, setEditProfilePopupLoading ] = useState(false);
  const [isAddPlacePopupLoading, setAddPlacePopupLoading] = useState(false);
  const [isEditAvatarPopupLoading, setEditAvatarPopupLoading] = useState(false);
  const [isConfirmationPopupLoading, setConfirmationPopupLoading] = useState(false);
  const [isInfoTooltipLoading, setInfoTooltipLoading] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({ _id: '', name: '', avatar: '', about: '' });
  const [cards, setCards] = useState([]);

  const [removalCard, setRemovalCard] = useState({});

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getCardList()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch(console.error)
    }
    
  }, [loggedIn])

  function handleRegister(email, password) {
    setInfoTooltipLoading(true);
    auth.register(email, password)
    .then(({ data }) => {
      setIsSuccessInfoTooltipStatus(true);
      openInfoTooltip();
      handleLogin(data.email, password);
    })
    .catch(err => {
      setIsSuccessInfoTooltipStatus(false)
      openInfoTooltip() 
    })
    .finally(() => setInfoTooltipLoading(false));
  }

  function handleLogin(email, password) {
    setInfoTooltipLoading(true);
    auth.authorize(email, password)
    .then(() => {
      localStorage.setItem('isLoggedIn', true);
      setEmail(email)
      setLoggedIn(true);
      navigate('/', { replace: true });
    })
    .catch(() => {
      setLoggedIn(false);
      setIsSuccessInfoTooltipStatus(false);
      openInfoTooltip() 
    })
    .finally(() => setInfoTooltipLoading(false));
  }

  function handleSignOut() {
    auth.logout()
    .then(() => {
      localStorage.removeItem('isLoggedIn');
      setLoggedIn(false);
      setEmail('');
      navigate('/signin', { replace: true });
    })
    .catch(err => console.log(err));
};

  function checkToken()  {
    if (localStorage.getItem('isLoggedIn')) {
      auth.checkToken()
      .then((data) => {
        setLoggedIn(true);
        setEmail(data.email);
        navigate('/', {replace: true});
      })
      .catch(() => {
        setLoggedIn(false);
        setEmail('');
      });
    }
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmationClick(card) {
    setConfirmationPopupOpen(true);
    setRemovalCard(card);
  }

  function openInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
    setRemovalCard({});
    setInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    // Проверка наличия лайка на карточке
    const isLiked = card.likes.some(id => id === currentUser._id);
    // Отправка запроса в API и получение обновлённых данных карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
  }

  function handleCardDelete(card) {
    setConfirmationPopupLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
        setRemovalCard({});
      })
      .catch(err => console.log(err))
      .finally(() => {
        setConfirmationPopupLoading(false);
      });
  }

  function handleUpdateUser(userData) {
    setEditProfilePopupLoading(true)
    api.sendUserData(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setEditProfilePopupLoading(false));
  }

  function handleUpdateAvatar(userData) {
    setEditAvatarPopupLoading(true);
    api.updateUserAvatar(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setEditAvatarPopupLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setAddPlacePopupLoading(true)
    api.postNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setAddPlacePopupLoading(false));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmationClick}
          />} />
          <Route path="/signup" element={<Register submitText={isInfoTooltipLoading ? "Регистрация..." : "Зарегистрироваться"} onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login submitText={isInfoTooltipLoading ? "Вход..." : "Войти"} onLogin={handleLogin}/>} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        </Routes>

        {loggedIn && <Footer />}
        
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
          isLoading={isEditProfilePopupLoading} 
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          isLoading={isEditAvatarPopupLoading} 
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} 
          isLoading={isAddPlacePopupLoading} 
        />

        <ConfirmationPopup 
          isOpen={isConfirmationPopupOpen} 
          onClose={closeAllPopups} 
          onDeleteCard={handleCardDelete} 
          card={removalCard} 
          isLoading={isConfirmationPopupLoading} 
        />
        
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups} 
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccessInfoTooltipStatus}
          isLoading={isInfoTooltipLoading}
          successIcon={successIcon}
          failIcon={failIcon}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;