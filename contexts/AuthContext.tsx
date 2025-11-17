import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { TEST_ACCOUNTS } from '../mocks/test-users';

export type UserRole = 'citizen' | 'lawyer';

export type CitizenData = {
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
};

export type LawyerData = {
  fullName: string;
  phone: string;
  email: string;
  barNumber: string;
  location: string;
  expertise: string[];
  yearsOfExperience: number;
  degreeUri?: string;
  verified: boolean;
};

export type User = {
  id: string;
  role: UserRole;
  email: string;
  data: CitizenData | LawyerData;
};

const AUTH_STORAGE_KEY = 'lex_rwanda_auth';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const initializeTestAccounts = useCallback(async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('lex_rwanda_users');
      if (!storedUsers) {
        const users = TEST_ACCOUNTS.map(({ password, ...user }) => user);
        await AsyncStorage.setItem('lex_rwanda_users', JSON.stringify(users));
        console.log('Test accounts initialized');
      }
    } catch (error) {
      console.error('Failed to initialize test accounts:', error);
    }
  }, []);

  const loadUser = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
      setIsLoading(false);
    }, 100);

    initializeTestAccounts().then(() => {
      loadUser();
    });

    return () => clearTimeout(timer);
  }, [loadUser, initializeTestAccounts]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('lex_rwanda_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser) {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser));
        setUser(foundUser);
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Failed to sign in' };
    }
  }, []);

  const signUpCitizen = useCallback(async (data: CitizenData & { password: string }) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        role: 'citizen',
        email: data.email,
        data: {
          fullName: data.fullName,
          nationalId: data.nationalId,
          phone: data.phone,
          email: data.email,
        },
      };

      const storedUsers = await AsyncStorage.getItem('lex_rwanda_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      
      await AsyncStorage.setItem('lex_rwanda_users', JSON.stringify(users));
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      
      setUser(newUser);
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Failed to create account' };
    }
  }, []);

  const signUpLawyer = useCallback(async (data: LawyerData & { password: string }) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        role: 'lawyer',
        email: data.email,
        data: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          barNumber: data.barNumber,
          location: data.location,
          expertise: data.expertise,
          yearsOfExperience: data.yearsOfExperience,
          degreeUri: data.degreeUri,
          verified: false,
        },
      };

      const storedUsers = await AsyncStorage.getItem('lex_rwanda_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      
      await AsyncStorage.setItem('lex_rwanda_users', JSON.stringify(users));
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      
      setUser(newUser);
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Failed to create account' };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, []);

  const isLawyer = useCallback(() => user?.role === 'lawyer', [user]);
  const isCitizen = useCallback(() => user?.role === 'citizen', [user]);

  return useMemo(() => ({
    user,
    isLoading,
    isHydrated,
    signIn,
    signUpCitizen,
    signUpLawyer,
    signOut,
    isLawyer,
    isCitizen,
  }), [user, isLoading, isHydrated, signIn, signUpCitizen, signUpLawyer, signOut, isLawyer, isCitizen]);
});
