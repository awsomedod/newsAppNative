import { View } from 'react-native';
import { Summary, SummaryRun, GenerationPhase, LiveSummary } from '../types';
import SummaryRunsHeader from './SummaryRunsHeader';
import SummaryRunsLoading from './SummaryRunsLoading';
import EmptySummaryRunsState from './EmptySummaryRunsState';
import SummaryRunsList from './SummaryRunsList';
import GenerationProgress from '../Components/GenerationProgress';
import LiveSummaryPreview from '../Components/LiveSummaryPreview';

interface SummaryRunsSectionProps {
  loading: boolean;
  summaryRuns: Array<SummaryRun>;
  refreshDisabled: boolean;
  setRefreshDisabled: (refreshDisabled: boolean) => void;
  setSelectedSummary: (summary: Summary) => void;
  setSummaryMode: (summaryMode: boolean) => void;
  setModalVisible: (visible: boolean) => void;
  onRefresh: () => void;
  isGenerating?: boolean;
  // New SSE-related props
  phase?: GenerationPhase;
  statusMessage?: string;
  topics?: string[];
  totalTopics?: number;
  completedSummaries?: number;
  isGeneratingSummaries?: boolean;
  liveSummaries?: LiveSummary[];
  error?: string | null;
}

export default function SummaryRunsSection({
  loading,
  summaryRuns,
  refreshDisabled,
  setSelectedSummary,
  setSummaryMode,
  setModalVisible,
  onRefresh,
  isGenerating,
  // New SSE-related props with defaults
  phase = 'idle',
  statusMessage = '',
  topics = [],
  totalTopics = 0,
  completedSummaries = 0,
  isGeneratingSummaries = false,
  liveSummaries = [],
  error = null,
}: SummaryRunsSectionProps) {
  const handleLiveSummaryPress = (summary: Summary) => {
    setSelectedSummary(summary);
    setSummaryMode(true);
    setModalVisible(true);
  };

  return (
    <View className="mx-4 border-gray-500/50 rounded-2xl border mb-4 bg-gray-900">
      {/* Summary Runs Header */}
      <SummaryRunsHeader
        refreshDisabled={refreshDisabled}
        onRefresh={onRefresh}
        isGenerating={isGenerating}
        phase={phase}
        error={error}
      />

      {/* Generation Progress - Shows during active generation */}
      {isGenerating && phase !== 'idle' && (
        <GenerationProgress
          phase={phase}
          statusMessage={statusMessage}
          topics={topics}
          totalTopics={totalTopics}
          completedSummaries={completedSummaries}
          isGeneratingSummaries={isGeneratingSummaries}
        />
      )}

      {/* Live Summary Preview - Shows summaries as they come in */}
      {isGenerating && liveSummaries.length > 0 && (
        <LiveSummaryPreview
          summaries={liveSummaries}
          totalTopics={totalTopics}
          onSummaryPress={handleLiveSummaryPress}
        />
      )}

      <View className="items-center py-4">
        {loading && !isGenerating ? (
          <SummaryRunsLoading />
        ) : (
          !isGenerating && summaryRuns.length === 0 && <EmptySummaryRunsState />
        )}

        {/* Summary Runs List */}
        {summaryRuns.length > 0 && !isGenerating && (
          <SummaryRunsList
            summaryRuns={summaryRuns}
            setSelectedSummary={setSelectedSummary}
            setSummaryMode={setSummaryMode}
            setModalVisible={setModalVisible}
          />
        )}
      </View>
    </View>
  );
}
