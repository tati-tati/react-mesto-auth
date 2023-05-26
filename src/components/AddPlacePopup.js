import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { useEffect, useState } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      class={"popup_add_picture"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      form={"form_post"}
      title={"Новое место"}
      onSubmit={(evt) => handleSubmit(evt)}
      buttonText={"Создать"}
    >
      <Input
        inputValue ={name}
        class={"popup__input_edit_title"}
        id={"input-title"}
        type={"text"}
        name={"name"}
        getInputValue={handleChangeName}
        placeholder={"Название"}
        minLength={"2"}
        maxLength={"30"}
        required
      />

      <Input
        inputValue ={link}
        class={"popup__input_edit_picture-source"}
        id={"input-url"}
        type={"url"}
        name={"link"}
        getInputValue={handleChangeLink}
        placeholder={"Ссылка на картинку"}
        required
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
