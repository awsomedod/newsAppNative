import { Text, View, Pressable } from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';

export default function AddSourceModalActions({
  onClose,
  activeTab,
  selectedIds,
  onAdd,
  onAddSelected,
}: {
  onClose: () => void;
  activeTab: string;
  selectedIds: Set<string>;
  onAdd: () => void;
  onAddSelected: () => void;
}) {
  return (
    <View className="mt-6 flex-row justify-end gap-2">
      <Pressable
        onPress={onClose}
        className="rounded-lg px-3 py-2 active:bg-gray-800"
      >
        <Text className="text-sm text-gray-300">Cancel</Text>
      </Pressable>
      {activeTab === 'manual' ? (
        <Pressable
          onPress={onAdd}
          className="flex-row items-center justify-center gap-2 rounded-lg transition-colors duration-200
          bg-blue-600 active:bg-blue-700 px-3 py-2 opacity-100"
        >
          <PlusIcon size={20} color="white" />
          <Text className="text-sm font-medium text-white">Add Source</Text>
        </Pressable>
      ) : (
        selectedIds.size > 0 && (
          <Pressable
            onPress={onAddSelected}
            className="flex-row items-center justify-center gap-2 rounded-lg transition-colors duration-200
          bg-green-600 active:bg-green-700 px-3 py-2 opacity-100"
          >
            <PlusIcon size={20} color="white" />
            <Text className="text-sm font-medium text-white">
              Add Selected ({selectedIds.size})
            </Text>
          </Pressable>
        )
      )}
    </View>
  );
}
