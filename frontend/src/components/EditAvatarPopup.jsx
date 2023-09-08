import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, errors, isValid, onChange, resetValidation } = useFormValidation();

  useEffect(() => {
    resetValidation()
  }, [isOpen, resetValidation])
  
  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name="updateAvatarForm"
      title="Обновить аватар"
      submitText={isLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input 
        name="avatar" 
        type="url" 
        placeholder="Ссылка на аватар" 
        className={errors.avatar ? 'popup__input popup__input_type_error' : 'popup__input'}
        id="input-avatar-link" 
        required
        value={values.avatar || ''} 
        onChange={onChange}
      />
      <span 
        className={errors.avatar ? 'popup__error popup__error_active' : 'popup__error'}>
        {errors.avatar}
      </span>
  </PopupWithForm>
  );
}

export default EditProfilePopup;