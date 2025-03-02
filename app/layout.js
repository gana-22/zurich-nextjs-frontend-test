'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import SessionProvider from '../components/SessionProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <SessionProvider>{children}</SessionProvider>
        </Provider>
      </body>
    </html>
  );
}