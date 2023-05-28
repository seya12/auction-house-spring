import { Dispatch, SetStateAction, createContext, useState } from "react";

export type User = {
  email: string;
  id: number;
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; //useState setter
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {
    ("");
  },
});

type Props = { children: React.ReactNode };

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
export default UserContext;
