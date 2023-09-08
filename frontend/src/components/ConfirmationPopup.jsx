import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ card, isOpen, onDeleteCard, isLoading, onClose }) {
  function handleSubmit(event) {
    event.preventDefault();
    onDeleteCard(card);
  }
  
  return (
    <PopupWithForm
      name="confirmDeleteForm"
      title="Вы уверены?"
      submitText={isLoading ?  "Удаление..." : "Да"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}

export default ConfirmationPopup;