import { View, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from './Components/DashboardHeader';
import WelcomeSection from './Components/WelcomeSection';
import NewsSourcesSection from './NewsSources/NewsSourcesSection';
import Backdrop from './Components/Backdrop';
import { useState, useCallback } from 'react';
import { DropdownContext } from '../contexts/DropdowContext';
import SummaryRunsSection from './SummaryRuns/SummaryRuns';
import { ApiService } from '../services/api';
import { useEffect } from 'react';
import { Summary, Source, SummaryRun } from './types';
import DashboardModal from './Modals/DashboardModal';
import { useNewsGeneration } from './hooks/useNewsGeneration';

/**
 * Main dashboard screen for authenticated users
 * Shows welcome message and provides logout functionality
 */

export default function DashboardScreen() {
  const { user, logout, token, updateUser } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [summaryMode, setSummaryMode] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState<Array<Source>>([]);
  const [summaryRuns, setSummaryRuns] = useState<Array<SummaryRun>>([]);
  const [refreshDisabled, setRefreshDisabled] = useState(true);

  // Callback when news generation completes
  const handleGenerationComplete = useCallback(
    (newRun: SummaryRun) => {
      // Add new summary run to the top of the list
      setSummaryRuns(prev => [newRun, ...prev]);

      // Update user context to keep it in sync
      if (user) {
        updateUser({
          ...user,
          summary_runs: [...(user.summary_runs || []), newRun],
        });
      }
    },
    [user, updateUser],
  );

  // Use the SSE news generation hook
  const {
    generateNews,
    isGenerating,
    error: generationError,
    phase,
    statusMessage,
    topics,
    totalTopics,
    liveSummaries,
    isGeneratingSummaries,
    completedSummaries,
  } = useNewsGeneration({
    sources,
    token,
    onComplete: handleGenerationComplete,
  });

  /**
   * Handle user logout with confirmation
   */
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        setLoading(true);
        try {
          const data = await ApiService.getUserData(token);
          // Update the context with the new full user object
          updateUser(data.user);
          setSources(data.user.sources);
          setSummaryRuns([...data.user.summary_runs].reverse());
          setRefreshDisabled(data.user.sources.length === 0);
          console.log('User data updated successfully');
          console.log(data.user);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No token found');
      }
    };

    fetchUserData();
  }, [token, updateUser]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout(); // Now synchronous
        },
      },
    ]);
  };

  const handleDeleteSource = async (sourceToDelete: Source) => {
    if (!token || !user) return;

    Alert.alert(
      'Delete Source',
      `Are you sure you want to remove ${sourceToDelete.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const newSources = sources.filter(
                s => s.url !== sourceToDelete.url,
              );
              setSources(newSources); // Optimistic update

              await ApiService.updateSources(token, newSources);

              // Update context
              updateUser({ ...user, sources: newSources });
              setRefreshDisabled(newSources.length === 0);
            } catch (error) {
              console.error('Failed to delete source:', error);
              setSources(sources); // Revert on error
              Alert.alert(
                'Error',
                'Failed to delete source. Please try again.',
              );
            }
          },
        },
      ],
    );
  };

  const handleAddSource = async (newSources: Source | Source[]) => {
    if (!token || !user) return;

    const sourcesToAdd = Array.isArray(newSources) ? newSources : [newSources];

    try {
      const updatedSources = [...sourcesToAdd, ...sources];
      setSources(updatedSources); // Optimistic update

      await ApiService.updateSources(token, updatedSources);

      // Update context
      updateUser({ ...user, sources: updatedSources });
      setRefreshDisabled(false);
    } catch (error) {
      console.error('Failed to add source:', error);
      setSources(sources); // Revert on error
      Alert.alert('Error', 'Failed to add source. Please try again.');
      throw error; // Propagate error to modal
    }
  };

  // Handle generating news using SSE stream
  const handleRefreshNews = () => {
    if (!token || !user) return;
    generateNews();
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      className="flex-1 pt-[StatusBar.currentHeight]"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <DropdownContext.Provider
          value={{ dropdownVisible, setDropdownVisible }}
        >
          <Backdrop />
          <DashboardModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            summaryMode={summaryMode}
            summary={selectedSummary}
            onAddSource={handleAddSource}
          />
          {/* MAIN CONTENT */}
          <View className="flex-1 m-4 border-gray-500/50 p-4 rounded-2xl border">
            <DashboardHeader
              username={user?.username}
              email={user?.email}
              onLogout={handleLogout}
            />
            <WelcomeSection username={user?.username} />
            <NewsSourcesSection
              setModalVisible={setModalVisible}
              loading={loading}
              sources={sources}
              setSummaryMode={setSummaryMode}
              onDeleteSource={handleDeleteSource}
            />
            <SummaryRunsSection
              loading={loading}
              summaryRuns={summaryRuns}
              refreshDisabled={refreshDisabled}
              setRefreshDisabled={setRefreshDisabled}
              setSelectedSummary={setSelectedSummary}
              setSummaryMode={setSummaryMode}
              setModalVisible={setModalVisible}
              onRefresh={handleRefreshNews}
              isGenerating={isGenerating}
              // SSE generation state
              phase={phase}
              statusMessage={statusMessage}
              topics={topics}
              totalTopics={totalTopics}
              completedSummaries={completedSummaries}
              isGeneratingSummaries={isGeneratingSummaries}
              liveSummaries={liveSummaries}
              error={generationError}
            />
          </View>
        </DropdownContext.Provider>
      </ScrollView>
    </SafeAreaView>
  );
}
