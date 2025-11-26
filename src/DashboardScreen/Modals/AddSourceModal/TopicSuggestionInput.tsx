import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { CheckIcon } from 'react-native-heroicons/solid';
import { Source } from '../../types';

interface TopicSuggestionInputProps {
  topic: string;
  onTopicChange: (text: string) => void;
  focusedInput: string | null;
  onFocusChange: (input: string | null) => void;
  onGetSuggestions?: () => void;
  selectedIds: Set<string>;
  setSelectedIds: (ids: Set<string>) => void;
  suggestions?: Array<Source & { id: string }>;
  loading?: boolean;
}

export default function TopicSuggestionInput({
  topic,
  onTopicChange,
  focusedInput,
  onFocusChange,
  onGetSuggestions,
  selectedIds,
  setSelectedIds,
  suggestions = [],
  loading = false,
}: TopicSuggestionInputProps) {
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  return (
    <View className="mt-4">
      {/* Topic Input Section */}
      <View>
        <Text className="block text-sm font-medium text-gray-300 mb-1">
          Topic
        </Text>
        <View className="flex-row gap-2">
          <TextInput
            value={topic}
            onChangeText={onTopicChange}
            onFocus={() => onFocusChange('topic')}
            onBlur={() => onFocusChange(null)}
            className={`
              flex-1 rounded-lg border-2 bg-gray-800 px-3 py-2 text-sm text-gray-100
              ${focusedInput === 'topic' ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-700'}
            `}
            placeholder="e.g., basketball, technology, politics"
            placeholderTextColor="#9CA3AF"
          />
          <Pressable
            onPress={onGetSuggestions}
            disabled={loading}
            className={`rounded-lg px-4 py-2 justify-center items-center
              ${loading ? 'bg-gray-700' : 'bg-blue-600 active:bg-blue-700'}
            `}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-sm font-medium text-white">
                Get Suggestions
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Suggested Sources Section */}
      <View className="mt-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="block text-sm font-medium text-gray-300">
            Suggested Sources ({selectedIds.size} selected)
          </Text>
        </View>

        <ScrollView className="max-h-80">
          <View>
            {suggestions.length > 0 ? (
              <FlatList
                data={suggestions}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  const isSelected = selectedIds.has(item.id);
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => toggleSelection(item.id)}
                      className={`
                    rounded-lg border p-3 flex-row items-start gap-3 mb-2
                    bg-gray-800 border-gray-700 active:border-gray-600
                  `}
                    >
                      {/* Checkbox */}
                      <View
                        className={`
                      mt-1 h-4 w-4 rounded border items-center justify-center
                      ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-transparent'}
                    `}
                      >
                        {isSelected && <CheckIcon size={12} color="white" />}
                      </View>

                      {/* Content */}
                      <View className="flex-1 min-w-0">
                        <Text className="text-sm font-medium text-white">
                          {item.name}
                        </Text>
                        <Text
                          className="mt-1 text-xs text-gray-300"
                          numberOfLines={2}
                        >
                          {item.description}
                        </Text>
                        <Text
                          className="mt-1 text-xs text-blue-400"
                          numberOfLines={1}
                        >
                          {item.url}
                        </Text>
                      </View>
                    </Pressable>
                  );
                }}
                keyExtractor={item => item.id}
              />
            ) : (
              <View className="py-8 items-center justify-center bg-gray-800 rounded-lg border border-gray-700 border-dashed">
                <Text className="text-gray-400 text-sm text-center">
                  {loading
                    ? 'Finding relevant sources...'
                    : 'Enter a topic and click "Get Suggestions"'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
