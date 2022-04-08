import { useContext } from "react";

export const ModalChildren = ({ 
  context,
}) => {
  const { isOpen, setIsOpen } = useContext(context);

  function handleButtonClick() {
    setIsOpen(!isOpen)
  }

  return (
    <button onClick={handleButtonClick}>Close Modal</button>
  )
}