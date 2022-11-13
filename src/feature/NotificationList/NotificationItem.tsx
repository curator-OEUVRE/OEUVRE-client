import React from 'react';

interface NotificationItemProps {
  contents: string;
  profileImageUrl: string;
  footer: string | (() => React.ReactNode);
  onPress: () => void;
}

const NotificationItem = () => {};

export { NotificationItem };
