import { createContext } from 'react';

const UserContext = createContext({
  userData: {},
  setUserData: () => {},
});

export default UserContext;