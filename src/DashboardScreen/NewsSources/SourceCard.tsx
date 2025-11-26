import { View, Text, TouchableOpacity, Linking } from 'react-native';
import {
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';

interface SourceCardProps {
  name: string;
  description: string;
  url: string;
  onDelete?: () => void;
}

export default function SourceCard({
  name,
  description,
  url,
  onDelete,
}: SourceCardProps) {
  const handleLinkPress = async () => {
    try {
      let targetUrl = url;
      if (
        !targetUrl.startsWith('http://') &&
        !targetUrl.startsWith('https://')
      ) {
        targetUrl = `https://${targetUrl}`;
      }

      const supported = await Linking.canOpenURL(targetUrl);

      if (supported) {
        await Linking.openURL(targetUrl);
      } else {
        console.log(`Don't know how to open this URL: ${targetUrl}`);
        // Attempt to open anyway as fallback
        await Linking.openURL(targetUrl);
      }
    } catch (error) {
      console.error('An error occurred opening link:', error);
    }
  };

  return (
    <View className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm mb-3">
      <View className="flex-row items-start justify-between">
        {/* Content Section */}
        <View className="flex-1 mr-2">
          {/* Header: Icon + Title */}
          <View className="flex-row items-center gap-2">
            <GlobeAltIcon size={20} color="#60a5fa" />
            <Text
              className="text-sm font-semibold text-white"
              numberOfLines={1}
            >
              {name}
            </Text>
          </View>

          {/* Description */}
          <Text className="mt-2 text-sm text-gray-300" numberOfLines={2}>
            {description}
          </Text>

          {/* Link */}
          <TouchableOpacity
            onPress={handleLinkPress}
            className="mt-2 flex-row items-center gap-1"
            activeOpacity={0.7}
          >
            <Text className="text-xs text-blue-400" numberOfLines={1}>
              {url}
            </Text>
            <ArrowTopRightOnSquareIcon size={12} color="#60a5fa" />
          </TouchableOpacity>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={onDelete}
          className="rounded-full p-1 bg-transparent active:bg-gray-700"
          activeOpacity={0.6}
        >
          <XMarkIcon size={16} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
