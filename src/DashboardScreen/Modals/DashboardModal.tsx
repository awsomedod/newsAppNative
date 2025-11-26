import { Modal, Pressable } from 'react-native';
import SummaryModal from './SummaryModal';
import AddSourceModal from './AddSourceModal/AddSourceModal';
import { Summary, Source } from '../types';

interface DashboardModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  summaryMode: boolean;
  summary: Summary | null;
  onAddSource: (source: Source | Source[]) => Promise<void>;
}

export default function DashboardModal({
  modalVisible,
  setModalVisible,
  summaryMode,
  summary,
  onAddSource,
}: DashboardModalProps) {
  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <Pressable
        className="flex-1 bg-gray-900/60 justify-center items-center p-4"
        onPress={handleClose}
      >
        {/* Modal Content */}
        <Pressable
          onPress={e => e.stopPropagation()}
          className="w-full max-w-lg"
        >
          {summaryMode && summary ? (
            <SummaryModal summary={summary} setModalVisible={setModalVisible} />
          ) : (
            <AddSourceModal
              setModalVisible={setModalVisible}
              onAddSource={onAddSource}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
