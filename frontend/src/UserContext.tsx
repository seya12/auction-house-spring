import { Dispatch, SetStateAction, createContext } from "react";

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
export default UserContext;
