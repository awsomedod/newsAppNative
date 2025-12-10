import { View, Text, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { SparklesIcon, CheckCircleIcon } from 'react-native-heroicons/solid';
import { GenerationPhase } from '../types';

interface GenerationProgressProps {
  phase: GenerationPhase;
  statusMessage: string;
  topics: string[];
  totalTopics: number;
  completedSummaries: number;
  isGeneratingSummaries: boolean;
}

/**
 * GenerationProgress component - Displays live progress during news generation
 * Shows status messages, discovered topics, and segmented progress bar
 */
export default function GenerationProgress({
  phase,
  statusMessage,
  topics,
  totalTopics,
  completedSummaries,
  isGeneratingSummaries,
}: GenerationProgressProps) {
  // Pulse animation for the sparkles icon
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Shimmer animation for current progress segment
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    );

    // Shimmer animation
    const shimmer = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    if (phase !== 'idle') {
      pulse.start();
      shimmer.start();
    }

    return () => {
      pulse.stop();
      shimmer.stop();
    };
  }, [phase, pulseAnim, shimmerAnim]);

  if (phase === 'idle') return null;

  return (
    <View className="mt-4 space-y-4 px-4">
      {/* Status Message */}
      <View className="flex-row items-center gap-2">
        <Animated.View style={{ opacity: pulseAnim }}>
          <SparklesIcon size={20} color="#f59e0b" />
        </Animated.View>
        <Text className="text-sm font-medium text-gray-300 flex-1">
          {statusMessage}
        </Text>
      </View>

      {/* Topics List - Show during categorizing and generating phases */}
      {topics.length > 0 && (
        <View className="bg-gray-800 rounded-xl p-4 border border-gray-700 mt-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Discovered Topics
            </Text>
            <View className="bg-blue-900/50 px-2 py-0.5 rounded-full">
              <Text className="text-xs font-bold text-blue-400">
                {topics.length} found
              </Text>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {topics.map((topic, index) => (
              <TopicBadge key={index} topic={topic} index={index} />
            ))}
          </View>
        </View>
      )}

      {/* Segmented Progress Bar - Show during summary generation */}
      {isGeneratingSummaries && totalTopics > 0 && (
        <View className="bg-gray-800/80 rounded-xl p-4 border border-blue-800/50 mt-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Generating Summaries
            </Text>
            <Text className="text-sm font-bold text-blue-300">
              {completedSummaries}/{totalTopics} completed
            </Text>
          </View>

          {/* Segmented Progress Bar */}
          <View className="flex-row gap-1">
            {Array.from({ length: totalTopics }).map((_, index) => {
              const isCompleted = index < completedSummaries;
              const isCurrent = index === completedSummaries;

              return (
                <ProgressSegment
                  key={index}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  shimmerAnim={shimmerAnim}
                />
              );
            })}
          </View>

          {/* Topic labels under progress bar */}
          <View className="flex-row gap-1 mt-2">
            {topics.slice(0, totalTopics).map((topic, index) => {
              const isCompleted = index < completedSummaries;
              const isCurrent = index === completedSummaries;
              return (
                <View key={index} className="flex-1 items-center">
                  <Text
                    className={`text-[10px] font-medium text-center ${
                      isCompleted
                        ? 'text-blue-400'
                        : isCurrent
                        ? 'text-indigo-400'
                        : 'text-gray-500'
                    }`}
                    numberOfLines={1}
                  >
                    {topic}
                  </Text>
                  {isCurrent && (
                    <Text className="text-[9px] text-indigo-400 mt-0.5">
                      In Progress...
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Completion Message */}
      {phase === 'done' && (
        <View className="flex-row items-center gap-2 p-3 bg-green-900/30 rounded-lg border border-green-800 mt-3">
          <CheckCircleIcon size={20} color="#22c55e" />
          <Text className="text-sm font-medium text-green-400">
            All summaries completed successfully!
          </Text>
        </View>
      )}
    </View>
  );
}

/**
 * TopicBadge - Individual topic tag with animation
 */
function TopicBadge({ topic, index }: { topic: string; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 100,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, index]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
      className="flex-row items-center gap-1.5 px-3 py-1.5 bg-gray-700 rounded-lg border border-gray-600"
    >
      <View className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      <Text className="text-sm font-medium text-gray-200">{topic}</Text>
    </Animated.View>
  );
}

/**
 * ProgressSegment - Individual progress bar segment
 */
function ProgressSegment({
  isCompleted,
  isCurrent,
  shimmerAnim,
}: {
  isCompleted: boolean;
  isCurrent: boolean;
  shimmerAnim: Animated.Value;
}) {
  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 50],
  });

  return (
    <View
      className={`flex-1 h-3 rounded-full overflow-hidden ${
        isCompleted
          ? 'bg-blue-500'
          : isCurrent
          ? 'bg-blue-700'
          : 'bg-gray-700'
      }`}
    >
      {isCurrent && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            transform: [{ translateX: shimmerTranslate }],
          }}
          className="bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      )}
      {isCompleted && (
        <View className="absolute inset-0 items-center justify-center">
          <CheckCircleIcon size={10} color="rgba(255,255,255,0.8)" />
        </View>
      )}
    </View>
  );
}

