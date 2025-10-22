import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline';

/**
 * Main dashboard screen for authenticated users
 * Shows welcome message and provides logout functionality
 */
export default function DashboardScreen() {
  const { user, logout } = useAuth();

  /**
   * Handle user logout with confirmation
   */
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white px-4 py-6 border-b border-gray-200 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <UserCircleIcon size={32} color="#3B82F6" />
                <Text className="ml-3 text-2xl font-bold text-gray-900">
                  Welcome back!
                </Text>
              </View>
              <Text className="text-lg font-medium text-gray-700">
                {user?.name || user?.username || 'User'}
              </Text>
              <Text className="text-sm text-gray-500">{user?.email}</Text>
              <Text className="mt-2 text-sm text-gray-600">
                Here's what's happening with your news today.
              </Text>
            </View>
            <Pressable
              onPress={handleLogout}
              className="p-3 rounded-full bg-red-50 active:bg-red-100 ml-4"
            >
              <ArrowRightOnRectangleIcon size={24} color="#DC2626" />
            </Pressable>
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Status Cards */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Quick Overview
            </Text>
            <View className="flex-row justify-between">
              <View className="flex-1 bg-white p-4 rounded-lg shadow-sm mr-2 border border-gray-100">
                <Text className="text-2xl font-bold text-blue-600 mb-1">0</Text>
                <Text className="text-sm text-gray-600">News Sources</Text>
              </View>
              <View className="flex-1 bg-white p-4 rounded-lg shadow-sm ml-2 border border-gray-100">
                <Text className="text-2xl font-bold text-green-600 mb-1">
                  0
                </Text>
                <Text className="text-sm text-gray-600">Summary Runs</Text>
              </View>
            </View>
          </View>

          {/* Coming Soon Section */}
          <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <Text className="text-xl font-semibold text-gray-900 mb-3">
              🚀 Coming Soon
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-700">News Sources Management</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <Text className="text-gray-700">AI News Summaries</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                <Text className="text-gray-700">Personalized Feed</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                <Text className="text-gray-700">Offline Reading</Text>
              </View>
            </View>
          </View>

          {/* User Info Card */}
          <View className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              Account Information
            </Text>
            <View className="space-y-2">
              <Text className="text-gray-700">
                <Text className="font-medium">Username:</Text> {user?.username}
              </Text>
              <Text className="text-gray-700">
                <Text className="font-medium">Email:</Text> {user?.email}
              </Text>
              {user?.name && (
                <Text className="text-gray-700">
                  <Text className="font-medium">Name:</Text> {user?.name}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
