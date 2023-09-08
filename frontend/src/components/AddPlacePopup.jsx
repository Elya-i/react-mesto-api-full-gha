import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, errors, isValid, onChange, resetValidation } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault(event);
    onAddPlace(values);
  }

  useEffect(() => {
    resetValidation()
  }, [isOpen, resetValidation])
  
  return (
    <PopupWithForm
      name="addImageForm"
      title="Новое место"
      submitText={isLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input 
        name="imageName" 
        type="text" 
        placeholder="Название" 
        className={errors.imageName ? 'popup__input popup__input_type_error' : 'popup__input'}
        id="input-image-name" minLength="2" maxLength="30" 
        required 
        value={values.imageName || ''} 
        onChange={onChange}
      />
      <span 
        className={errors.imageName ? 'popup__error popup__error_active' : 'popup__error'} 
        id="input-image-name-error">
        {errors.imageName}
      </span>
      <input 
        name="imageLink" 
        type="url" 
        placeholder="Ссылка на картинку" 
        className={errors.imageLink ? 'popup__input popup__input_type_error' : 'popup__input'}
        id="input-image-link"
        required 
        value={values.imageLink || ''}
        onChange={onChange} 
      />
      <span 
        className={errors.imageLink ? 'popup__error popup__error_active' : 'popup__error'} 
        id="input-image-link-error">
        {errors.imageLink}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
