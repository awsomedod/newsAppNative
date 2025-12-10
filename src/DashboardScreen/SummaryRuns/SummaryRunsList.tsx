import { View, SectionList } from 'react-native';
import { SummaryRun, Summary } from '../types';
import SummaryRunsListHeader from './SummaryRunsListHeader';
import SummaryRunDateHeader from './SummaryRunDateHeader';
import SummaryItem from './SummaryItem';

interface SummaryRunsListProps {
  summaryRuns: Array<SummaryRun>;
  setSelectedSummary: (summary: Summary) => void;
  setSummaryMode: (summaryMode: boolean) => void;
  setModalVisible: (visible: boolean) => void;
}

export default function SummaryRunsList({
  summaryRuns,
  setSelectedSummary,
  setSummaryMode,
  setModalVisible,
}: SummaryRunsListProps) {
  const sections = summaryRuns.map(run => ({
    title: run.date_and_time,
    summariesCount: run.summaries.length,
    data: run.summaries,
  }));

  return (
    <View className="w-full px-5">
      <SummaryRunsListHeader count={summaryRuns.length} />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={({ section }) => (
          <SummaryRunDateHeader
            dateAndTime={section.title}
            summariesCount={section.summariesCount}
          />
        )}
        // Each Summary item
        renderItem={({ item }) => (
          <SummaryItem
            title={item.title}
            summary={item.summary}
            image={item.image}
            topic={item.topic}
            onPress={() => {
              setSelectedSummary(item);
              setSummaryMode(true);
              setModalVisible(true);
            }}
          />
        )}
      />
    </View>
  );
}
