import { Pressable } from 'react-native';
import { DropdownContext } from '../../contexts/DropdowContext';
import { useContext } from 'react';

/**
 * Full-screen backdrop overlay that dismisses on tap
 * Used for dropdown menus and modals
 */
export default function Backdrop() {
  const { dropdownVisible, setDropdownVisible } = useContext(DropdownContext);

  if (!dropdownVisible) return null;

  return (
    <Pressable
      onPress={() => setDropdownVisible(false)}
      className="absolute inset-0 z-40"
    >
      {/* Empty — this is just the touch area */}
    </Pressable>
  );
}
