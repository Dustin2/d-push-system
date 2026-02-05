import { PushProvider } from "../ports/PushProvider";
import { Message } from "../domain/Message";

export class FakePushProvider implements PushProvider {
  name = "fake";

  async send(message: Message, token: string): Promise<void> {
    console.log("[FAKE PUSH]");
    console.log("Token:", token);
    console.log("Title:", message.title);
    console.log("Body:", message.body);
  }
}
