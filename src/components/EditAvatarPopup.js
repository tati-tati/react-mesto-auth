import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function EditAvatarPopup (props) {

  const avatar = useRef();

  useEffect(() => {
    avatar.current.value = '';
    // console.log("из useEffect", avatar)
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar:avatar.current.value});
 }

  return (
    <PopupWithForm
        class={"popup_edit_avatar"}
        isOpen={props.isOpen}
        onClose={props.onClose}
        form={"form_edit_avatar"}
        name="edit-avatar-form"
        title={"Обновить аватар"}
        buttonText={"Сохранить"}
        onSubmit={(evt)=> handleSubmit(evt)}
      >
        <Input
          class={"popup__input_edit_avatar-source"}
          id={"input-avatar"}
          type={"url"}
          name={"avatar"}
          placeholder={"Ссылка на картинку"}
          // getInputValue={handleChangeAvatar}
          uRef={avatar}
          required
        />
      </PopupWithForm>
  )
}

export default EditAvatarPopup;