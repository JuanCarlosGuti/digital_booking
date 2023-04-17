import {createContext} from 'react';

 const EmailContext = createContext({
    email: "",
    setEmail: () => {},
  });

export default EmailContext;
