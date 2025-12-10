import { View, Text, Pressable, ActivityIndicator, Animated, Easing } from 'react-native';
import { ArrowPathIcon, SparklesIcon } from 'react-native-heroicons/outline';
import { useEffect, useRef } from 'react';
import { GenerationPhase } from '../types';

interface SummaryRunsHeaderProps {
  refreshDisabled: boolean;
  onRefresh: () => void;
  isGenerating?: boolean;
  phase?: GenerationPhase;
  error?: string | null;
}

export default function SummaryRunsHeader({
  refreshDisabled,
  onRefresh,
  isGenerating = false,
  phase = 'idle',
  error = null,
}: SummaryRunsHeaderProps) {
  // Spin animation for the generating state
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isGenerating) {
      const spin = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      spin.start();
      return () => spin.stop();
    } else {
      spinAnim.setValue(0);
    }
  }, [isGenerating, spinAnim]);

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getButtonText = () => {
    if (!isGenerating) return 'Generate News';
    switch (phase) {
      case 'starting':
        return 'Starting...';
      case 'categorizing':
        return 'Categorizing...';
      case 'generating':
        return 'Generating...';
      case 'done':
        return 'Completing...';
      default:
        return 'Generating...';
    }
  };

  return (
    <View className="flex justify-between border-b px-4 py-2 border-gray-700">
      <Text className="text-2xl font-semibold pb-4 text-white">
        Summary Runs
      </Text>

      <Pressable
        onPress={onRefresh}
        className={`
          flex-row items-center justify-center gap-2
          rounded-xl px-4 py-3 mb-4
          shadow-lg
          ${
            refreshDisabled || isGenerating
              ? 'bg-gray-700 opacity-60'
              : 'bg-blue-600 active:bg-blue-700'
          }
        `}
        disabled={refreshDisabled || isGenerating}
        style={
          !refreshDisabled && !isGenerating
            ? {
                shadowColor: '#3b82f6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }
            : undefined
        }
      >
        {isGenerating ? (
          <>
            <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
              <ArrowPathIcon size={20} color="white" />
            </Animated.View>
            <Text className="text-white text-base font-semibold">
              {getButtonText()}
            </Text>
          </>
        ) : (
          <>
            <SparklesIcon size={20} color="white" />
            <Text className="text-white text-base font-semibold">
              {getButtonText()}
            </Text>
          </>
        )}
      </Pressable>

      {/* Error Message */}
      {error && (
        <View className="bg-red-900/30 border border-red-700 rounded-lg p-3 mb-4">
          <Text className="text-sm text-red-400 text-center">{error}</Text>
        </View>
      )}

      {/* Help text when no sources */}
      {refreshDisabled && !isGenerating && !error && (
        <Text className="text-sm text-gray-400 mb-4 text-center">
          Add sources to generate news summaries
        </Text>
      )}
    </View>
  );
}
