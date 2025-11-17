import { AnalyticsProvider } from '@rork-ai/toolkit-sdk';
import { RorkDevWrapper } from '@rork-ai/toolkit-dev-sdk/v54';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { isHydrated } = useAuth();
  const [splashHidden, setSplashHidden] = useState(false);

  useEffect(() => {
    if (isHydrated && !splashHidden) {
      SplashScreen.hideAsync();
      setSplashHidden(true);
    }
  }, [isHydrated, splashHidden]);

  if (!isHydrated) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/welcome" options={{ headerShown: false }} />
      <Stack.Screen name="auth/role-select" options={{ headerShown: false }} />
      <Stack.Screen name="auth/citizen-signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/lawyer-signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/pending-verification" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="lawyer/[id]" options={{ headerShown: true, title: "Lawyer Profile" }} />
    </Stack>
  );
}

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default function RorkRootLayoutWrapper() {
  return (
    <AnalyticsProvider><RorkDevWrapper><RootLayout /></RorkDevWrapper></AnalyticsProvider>
  );
}