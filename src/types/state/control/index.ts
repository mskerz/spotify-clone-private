interface OpenControl {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default OpenControl;