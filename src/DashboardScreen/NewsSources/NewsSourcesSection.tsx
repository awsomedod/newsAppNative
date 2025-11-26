import { View, Text } from 'react-native';
import NewsSourcesLoading from './NewsSourcesLoading';
import NewsSourcesList from './NewsSourcesList';
import EmptySourcesState from './EmptySourcesState';
import { Source } from '../types';

interface NewsSourcesSectionProps {
  loading: boolean;
  setModalVisible: (visible: boolean) => void;
  sources: Array<Source>;
  setSummaryMode: (summaryMode: boolean) => void;
  onDeleteSource: (source: {
    name: string;
    url: string;
    description: string;
  }) => void;
}

export default function NewsSourcesSection({
  loading,
  setModalVisible,
  sources,
  setSummaryMode,
  onDeleteSource,
}: NewsSourcesSectionProps) {
  const handleOnAddSource = () => {
    setModalVisible(true);
    setSummaryMode(false);
  };

  return (
    <View className="mx-4 border-gray-500/50 rounded-2xl border mb-4 bg-gray-900">
      <View className="flex justify-between border-b px-4 py-2 border-gray-700">
        <Text className="text-2xl font-semibold text-white">News Sources</Text>
      </View>
      <View className="pt-4 px-4 w-full">
        {loading ? (
          <NewsSourcesLoading />
        ) : sources.length > 0 ? (
          <NewsSourcesList
            sources={sources}
            onAddSource={handleOnAddSource}
            onDeleteSource={onDeleteSource}
          />
        ) : (
          <EmptySourcesState onAddSource={handleOnAddSource} />
        )}
      </View>
    </View>
  );
}
