import { View } from 'react-native';
import { Summary, SummaryRun } from '../types';
import SummaryRunsHeader from './SummaryRunsHeader';
import SummaryRunsLoading from './SummaryRunsLoading';
import EmptySummaryRunsState from './EmptySummaryRunsState';
import SummaryRunsList from './SummaryRunsList';

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
}: SummaryRunsSectionProps) {
  return (
    <View className="mx-4 border-gray-500/50 rounded-2xl border mb-4 bg-gray-900">
      {/* Summary Runs Header */}
      <SummaryRunsHeader
        refreshDisabled={refreshDisabled}
        onRefresh={onRefresh}
        isGenerating={isGenerating}
      />
      <View className="items-center py-4">
        {loading ? (
          <SummaryRunsLoading />
        ) : (
          summaryRuns.length === 0 && <EmptySummaryRunsState />
        )}

        {/* TODO: Summary Runs List */}
        {summaryRuns.length > 0 && (
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
