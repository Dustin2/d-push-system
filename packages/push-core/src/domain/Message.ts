// This file defines the structure of a Message object used in the push notification system.
export interface Message {
  title: string;
  body: string;
  data?: Record<string, any>;
}
