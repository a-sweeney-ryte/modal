import { useContext } from "react";

export const ModalButton = ({
  context,
}) => {
  const { isOpen, setIsOpen } = useContext(context);

  function handleButtonClick() {
    setIsOpen(!isOpen)
  }

  return (
    <button onClick={handleButtonClick}>Open Modal</button>
  )
}