import { View, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from './Components/DashboardHeader';
import WelcomeSection from './Components/WelcomeSection';
import NewsSourcesSection from './NewsSources/NewsSourcesSection';
import Backdrop from './Components/Backdrop';
import { useState } from 'react';
import { DropdownContext } from '../contexts/DropdowContext';
import SummaryRunsSection from './SummaryRuns/SummaryRuns';
import { ApiService } from '../services/api';
import { useEffect } from 'react';
import { Summary, Source, SummaryRun } from './types';
import DashboardModal from './Modals/DashboardModal';
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
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleRefreshNews = async () => {
    if (!token || !user) return;

    setIsGenerating(true);
    try {
      const sourceUrls = sources.map(s => s.url);
      const response = await ApiService.generateNews(token, sourceUrls);

      // Create new summary run from response
      // The response structure is not fully defined in types, but based on the prompt:
      // "respond with a date and time and an array of the new summaries only"
      // Assuming response matches SummaryRun interface partially or fully
      const newRun: SummaryRun = {
        date_and_time: response.date_and_time,
        summaries: response.summaries,
        id: response.id || Date.now().toString(), // Fallback ID if not provided
      };

      const updatedSummaryRuns = [newRun, ...summaryRuns];
      setSummaryRuns(updatedSummaryRuns);

      // Update user context as well to keep it in sync
      updateUser({
        ...user,
        summary_runs: [
          // Map to match User interface structure if different, but it seems similar enough
          // based on AuthContext.tsx User interface
          ...(user.summary_runs || []),
          newRun,
        ],
      });
    } catch (error) {
      console.error('Failed to refresh news:', error);
      Alert.alert('Error', 'Failed to generate news. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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
            />
          </View>
        </DropdownContext.Provider>
      </ScrollView>
    </SafeAreaView>
  );
}
