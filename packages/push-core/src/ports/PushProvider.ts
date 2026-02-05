import { Message } from "../domain/Message";

export interface PushProvider {
  name: string;
  send(message: Message, token: string): Promise<void>;
}
