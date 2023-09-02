'use client';

import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

type Props = { children: React.ReactNode };

const ClientWrapper: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientWrapper;
