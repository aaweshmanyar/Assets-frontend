import React, { useEffect } from 'react';
import OneSignal from 'react-onesignal';

export default function OneSignalInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      OneSignal.init({
        appId: 'e80d68c6-e966-4e45-9aa2-c7b4abe55e31', // Replace with your actual OneSignal App ID
        notifyButton: {
          enable: true,    // Show the default OneSignal bell button on your site
        },
        allowLocalhostAsSecureOrigin: true,  // Allows localhost for testing push in development
      });
    }
  }, []);

  return null; // This is only for side-effect initialization
}
