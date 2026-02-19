import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User, AuthCredentials, AuthResponse } from '@/types/domain';
import { useAuthStore } from '@/lib/application/stores/authStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const authClient = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  withCredentials: true,
});

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const response = await authClient.post<{ success: boolean; data: AuthResponse }>('/login', credentials);
      return response.data.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (credentials: AuthCredentials & { firstName: string; lastName: string }) => {
      const response = await authClient.post<{ success: boolean; data: AuthResponse }>('/register', credentials);
      return response.data.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

export const useSession = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const response = await authClient.get<{ success: boolean; data: User | null }>('/session');
        return response.data.data;
      } catch {
        return null;
      }
    },
    select: (data) => {
      setUser(data);
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      await authClient.post('/logout');
    },
    onSuccess: () => {
      logout();
    },
  });
};
