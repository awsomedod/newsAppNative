import { View } from 'react-native';
import FormInputField from '../../Components/FormInputField';

interface SourceData {
  name: string;
  url: string;
  description: string;
}

interface SourceFormFieldsProps {
  newSource: SourceData;
  setNewSource: React.Dispatch<React.SetStateAction<SourceData>>;
  focusedInput: string | null;
  setFocusedInput: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SourceFormFields({
  newSource,
  setNewSource,
  focusedInput,
  setFocusedInput,
}: SourceFormFieldsProps) {
  return (
    <View className="space-y-4">
      {/* Name Input */}
      <FormInputField
        label="Name"
        value={newSource.name}
        onChangeText={text => setNewSource(prev => ({ ...prev, name: text }))}
        setFocusedInput={setFocusedInput}
        focusedInput={focusedInput}
        placeholder="e.g., ESPN"
      />

      {/* URL Input */}
      <FormInputField
        label="URL"
        value={newSource.url}
        onChangeText={text => setNewSource(prev => ({ ...prev, url: text }))}
        setFocusedInput={setFocusedInput}
        focusedInput={focusedInput}
        placeholder="https://www.example.com"
      />

      {/* Description Input */}
      <FormInputField
        label="Description"
        value={newSource.description}
        onChangeText={text =>
          setNewSource(prev => ({ ...prev, description: text }))
        }
        setFocusedInput={setFocusedInput}
        focusedInput={focusedInput}
        placeholder="Brief description of the source..."
      />
    </View>
  );
}
