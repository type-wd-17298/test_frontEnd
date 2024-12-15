import { createContext, useState, useContext, ReactNode } from "react";

type User = {
  id?: number;
  firstName: string;
  lastName:string;
  phone: string;
};

type RegistrationContextType = {
  registrations: User[];
  totalSeats: number;
  remainingSeats: number;
  setTotalSeats: (seats: number) => void;
  addRegistration: (user: User) => void;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

type RegistrationProviderProps = {
  children: ReactNode;
};

export const RegistrationProvider = ({ children }: RegistrationProviderProps) => {
  const [registrations, setRegistrations] = useState<User[]>([]);
  const [totalSeats, setTotalSeats] = useState<number>(10);

  const addRegistration = (user: User) => {
    setRegistrations((prev) => [...prev, { ...user, id: Date.now() }]);
  };

  const remainingSeats = totalSeats - registrations.length;

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        totalSeats,
        remainingSeats,
        setTotalSeats,
        addRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};
