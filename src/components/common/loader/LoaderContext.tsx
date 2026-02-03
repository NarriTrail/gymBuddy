import React from 'react';
const LoaderContext = React.createContext<{
  loading?: boolean;
  setLoading?: Function;
}>({});
export default LoaderContext;
