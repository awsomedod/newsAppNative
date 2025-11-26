import { View } from 'react-native';
import { useContext } from 'react';
import { DropdownContext } from '../../../contexts/DropdowContext';
import UserProfileButton from './UserProfileButton';
import UserProfileDropdown from './UserProfileDropdown';

interface UserProfileMenuProps {
  /**
   * Username to display
   */
  username: string | undefined;
  /**
   * Email to display in dropdown
   */
  email: string | undefined;
  /**
   * Callback when logout is pressed
   */
  onLogout: () => void;
}

/**
 * User profile button with dropdown menu
 * Manages its own dropdown visibility state
 */
export default function UserProfileMenu({
  username,
  email,
  onLogout,
}: UserProfileMenuProps) {
  const { dropdownVisible, setDropdownVisible } = useContext(DropdownContext);

  return (
    <View className="relative">
      <UserProfileButton
        username={username}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      />

      {dropdownVisible && (
        <UserProfileDropdown
          email={email}
          onLogout={onLogout}
          onClose={() => setDropdownVisible(false)}
        />
      )}
    </View>
  );
}
