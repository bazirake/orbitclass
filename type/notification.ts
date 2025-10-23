export type NotificationType = 'success' | 'warning' | 'info' | 'danger';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time?: string;
  duration?: number;
}