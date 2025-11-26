import { useState } from 'react';
import { View, Alert } from 'react-native';
import AddSourceModalHeader from './AddSourceModalHeader';
import AddSourceModalTab from './AddSourceModalTab';
import SourceFormFields from './SourceFormFields';
import TopicSuggestionInput from './TopicSuggestionInput';
import AddSourceModalActions from './AddSourceModalActions';
import { Source } from '../../types';
import { ApiService } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

interface AddSourceModalProps {
  setModalVisible: (visible: boolean) => void;
  onAddSource: (source: Source | Source[]) => Promise<void>;
}

export default function AddSourceModal({
  setModalVisible,
  onAddSource,
}: AddSourceModalProps) {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'suggest'
  const [newSource, setNewSource] = useState({
    name: '',
    url: '',
    description: '',
  });
  const [topic, setTopic] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [suggestions, setSuggestions] = useState<
    Array<Source & { id: string }>
  >([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleAdd = async () => {
    // Validation
    if (!newSource.name.trim()) {
      Alert.alert('Required Field', 'Please enter a source name');
      return;
    }
    if (!newSource.url.trim()) {
      Alert.alert('Required Field', 'Please enter a source URL');
      return;
    }

    if (!newSource.description.trim()) {
      Alert.alert('Required Field', 'Please enter a source description');
      return;
    }

    // Simple URL validation
    try {
      // eslint-disable-next-line no-new
      new URL(newSource.url);
    } catch (e) {
      Alert.alert(
        'Invalid URL',
        'Please enter a valid URL (e.g., https://example.com)',
      );
      return;
    }

    try {
      await onAddSource(newSource);
      handleClose();
    } catch (error) {
      // Error is already handled in DashboardScreen
    }
  };

  const handleGetSuggestions = async () => {
    if (!token || !topic.trim()) return;

    setLoadingSuggestions(true);
    try {
      const response = await ApiService.suggestSources(token, topic);
      // Add a temporary ID for selection since the API doesn't return one
      const sourcesWithIds = response.sources.map((source, index) => ({
        ...source,
        id: `${source.url}-${index}`,
      }));
      setSuggestions(sourcesWithIds);
      // Reset selection when new suggestions are loaded
      setSelectedIds(new Set());
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      Alert.alert(
        'Error',
        'Failed to get source suggestions. Please try again.',
      );
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleAddSelected = async () => {
    const selectedSources = suggestions
      .filter(s => selectedIds.has(s.id))
      .map(({ id, ...source }) => source); // Remove the temporary ID

    if (selectedSources.length === 0) return;

    try {
      await onAddSource(selectedSources);
      handleClose();
    } catch (error) {
      // Error is already handled in DashboardScreen
    }
  };

  return (
    <View className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
      <AddSourceModalHeader />

      {/* Tab Navigation */}
      <View className="mt-4 flex-row rounded-lg bg-gray-800 p-1">
        <AddSourceModalTab
          label="Manual Entry"
          isSelected={activeTab === 'manual'}
          onPress={() => setActiveTab('manual')}
        />
        <AddSourceModalTab
          label="AI Suggestions"
          isSelected={activeTab === 'suggest'}
          onPress={() => setActiveTab('suggest')}
        />
      </View>

      {/* Tab Content */}
      {activeTab === 'manual' ? (
        <SourceFormFields
          newSource={newSource}
          setNewSource={setNewSource}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
        />
      ) : (
        <View>
          {/* Topic Input */}
          <TopicSuggestionInput
            topic={topic}
            onTopicChange={setTopic}
            focusedInput={focusedInput}
            onFocusChange={setFocusedInput}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onGetSuggestions={handleGetSuggestions}
            suggestions={suggestions}
            loading={loadingSuggestions}
          />
        </View>
      )}

      {/* Action Buttons */}
      <AddSourceModalActions
        onClose={handleClose}
        activeTab={activeTab}
        selectedIds={selectedIds}
        onAdd={handleAdd}
        onAddSelected={handleAddSelected}
      />
    </View>
  );
}
