import { createContext } from 'react';

export const FoodContext = createContext();

// eslint-disable-next-line react/prop-types
export const FoodProvider = ({ children }) => {
  return (
    <FoodContext.Provider value={{}}>
      {children}
    </FoodContext.Provider>
  );
};
