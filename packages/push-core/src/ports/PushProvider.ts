import { Message } from "../domain/Message";

export interface PushProvider {
  name: string;
  send(message: Message, target: string): Promise<void>;
}
