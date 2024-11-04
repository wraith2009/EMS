// context/UserContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserById } from "@/src/actions/auth.actions";
type Role = "teacher" | "student" | "admin" | "hod" | "other";
interface UserData {
  name: string;
  avatar: string;
  role: Role;
  email: string;
  id: string;
  // Add other user properties as needed
}

interface UserContextType {
  userData: UserData | null;
  isLoading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dhrbg2jbi/image/upload/c_crop,w_700,h_700,g_auto/v1729231721/Untitled_design_1__page-0001_bngic2.jpg";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { data: session } = useSession();
  const userId = (session?.user as { id?: string })?.id;

  const fetchUserData = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getUserById({ userId });
      if (response?.user) {
        setUserData({
          name: response.user.name || "User",
          avatar: response.user.avatar || DEFAULT_AVATAR,
          role: response.user.role || "student",
          email: response.user.email,
          id: response.user.id,
        });
      }
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch user data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        error,
        refetchUser: fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
