import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({ name, about: description });    
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      class={"popup_edit-profile"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={"Редактировать профиль"}
      form={"form_profile"}
      buttonText={"Сохранить"}
    >
      <Input
        inputValue ={name || ""}
        class={"popup__input_edit_name"}
        id={"input-name"}
        type={"text"}
        name={"name"}
        placeholder={"Имя"}
        minLength={"2"}
        maxLength={"40"}
        getInputValue={handleChangeName}
        required
      />

      <Input
        inputValue ={description || ""}
        class={"popup__input_edit_job"}
        id={"input-job"}
        type={"text"}
        name={"about"}
        placeholder={"Описание профиля"}
        minLength={"2"}
        maxLength={"200"}
        getInputValue={handleChangeDescription}
        required
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
