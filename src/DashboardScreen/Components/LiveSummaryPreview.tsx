import { View, Text, Image, Pressable, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { SparklesIcon, CheckIcon } from 'react-native-heroicons/solid';
import { LiveSummary, Summary } from '../types';

interface LiveSummaryPreviewProps {
  summaries: LiveSummary[];
  totalTopics: number;
  onSummaryPress: (summary: Summary) => void;
}

/**
 * LiveSummaryPreview component - Displays summaries as they stream in during generation
 * Similar visual style to SummaryItem but with live generation indicators
 */
export default function LiveSummaryPreview({
  summaries,
  totalTopics,
  onSummaryPress,
}: LiveSummaryPreviewProps) {
  if (summaries.length === 0) return null;

  return (
    <View className="px-4 py-3">
      {/* Header */}
      <View className="flex-row items-center gap-2 pb-3 mb-3 border-b border-blue-800/50">
        <SparklesIcon size={16} color="#f59e0b" />
        <Text className="text-sm font-semibold text-white">Live Preview</Text>
        <View className="bg-blue-900/50 px-2 py-0.5 rounded-full ml-auto">
          <Text className="text-xs text-blue-400 font-medium">
            {summaries.length} of {totalTopics} ready
          </Text>
        </View>
      </View>

      {/* Live Summaries */}
      <View className="gap-3">
        {summaries.map((summary, index) => (
          <LiveSummaryCard
            key={index}
            summary={summary}
            index={index}
            onPress={() => onSummaryPress(summary)}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * LiveSummaryCard - Individual summary card with entrance animation
 */
function LiveSummaryCard({
  summary,
  index,
  onPress,
}: {
  summary: LiveSummary;
  index: number;
  onPress: () => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 150,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();

    // Bounce animation for checkmark
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -3,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim, slideAnim, scaleAnim, bounceAnim, index]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim },
        ],
      }}
    >
      <Pressable
        onPress={onPress}
        className="active:scale-[0.98] transition-all"
      >
        <View className="flex-row gap-3 p-4 rounded-xl border-2 border-blue-700/50 bg-gray-800/80">
          {/* Summary Image */}
          <View className="flex-shrink-0 relative">
            <Image
              source={{ uri: summary.image }}
              className="w-20 h-20 rounded-lg bg-gray-700"
            />
            {/* Green checkmark badge */}
            <Animated.View
              style={{ transform: [{ translateY: bounceAnim }] }}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full items-center justify-center shadow-lg"
            >
              <CheckIcon size={14} color="white" strokeWidth={3} />
            </Animated.View>
          </View>

          {/* Summary Content */}
          <View className="flex-1 min-w-0">
            {/* Topic tag */}
            <View className="flex-row items-center gap-1 px-2 py-0.5 mb-2 bg-blue-900/40 rounded-md self-start">
              <View className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <Text className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider">
                {summary.topic}
              </Text>
            </View>

            <Text
              className="text-sm font-semibold text-white leading-tight mb-2"
              numberOfLines={2}
            >
              {summary.title}
            </Text>

            {summary.summary && (
              <Text
                className="text-xs text-gray-400 leading-relaxed"
                numberOfLines={3}
              >
                {summary.summary}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

