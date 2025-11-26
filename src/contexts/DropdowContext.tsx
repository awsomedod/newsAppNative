import { createContext } from 'react';

export interface DropdownState {
  dropdownVisible: boolean;
  setDropdownVisible: (visible: boolean) => void;
}

export const DropdownContext = createContext<DropdownState>({
  dropdownVisible: false,
  setDropdownVisible: () => {},
});
