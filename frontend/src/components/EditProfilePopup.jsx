import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidation from '../hooks/useFormValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, errors, isValid, onChange, resetValidation } = useFormValidation();
 
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => { 
    if (currentUser) {
      resetValidation(currentUser)
    }
  }, [currentUser, isOpen, resetValidation]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(values);
  }
  
  return (
    <PopupWithForm
      name="profileEditForm"
      title="Редактировать профиль"
      submitText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input 
        name="name" 
        type="text" 
        placeholder="Имя" 
        className={errors.name ? 'popup__input popup__input_type_error' : 'popup__input'}
        id="name-input" 
        minLength="2" 
        maxLength="40" 
        required 
        onChange={onChange} 
        value={values.name || ''}
      />
      <span 
        className={errors.name ? 'popup__error popup__error_active' : 'popup__error'} 
        id="name-input-error" >
        {errors.name}
      </span>
      <input 
        name="about" 
        type="text"
        placeholder="О себе" 
        className={errors.about ? 'popup__input popup__input_type_error' : 'popup__input'}
        id="about-input"  
        minLength="2"
        maxLength="200" 
        required 
        onChange={onChange} 
        value={values.about || ''} />
      <span 
        className={errors.about ? 'popup__error popup__error_active' : 'popup__error'}
        id="about-input-error">
        {errors.about}
      </span>
    </PopupWithForm> 
  );
}

export default EditProfilePopup;
