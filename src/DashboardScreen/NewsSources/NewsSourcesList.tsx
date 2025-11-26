import { FlatList } from 'react-native';
import SourceCard from './SourceCard';
import AddSourceButton from './AddSourceButton';
import { Source } from '../types';

interface NewsSourcesListProps {
  sources: Array<Source>;
  onAddSource: () => void;
  onDeleteSource: (source: Source) => void;
}

export default function NewsSourcesList({
  sources,
  onAddSource,
  onDeleteSource,
}: NewsSourcesListProps) {
  return (
    <>
      <AddSourceButton onPress={onAddSource} />
      <FlatList
        data={sources}
        keyExtractor={(item, index) => item.url + index}
        renderItem={({ item }) => (
          <SourceCard
            name={item.name}
            description={item.description}
            url={item.url}
            onDelete={() => onDeleteSource(item)}
          />
        )}
      />
    </>
  );
}
