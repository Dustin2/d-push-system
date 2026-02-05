import { SendPush } from "./use-cases/SendPush";
import { FakeDeviceRepository } from "./fakes/FakeDeviceRepository";
import { FakePushProvider } from "./fakes/FakePushProvider";
import { Message } from "./domain/Message";
import { Target } from "./domain/Target";

async function main() {
  const deviceRepo = new FakeDeviceRepository();
  const provider = new FakePushProvider();

  const sendPush = new SendPush(deviceRepo, [provider]);

  const target: Target = {
    kind: "user",
    id: "user-1",
  };

  const message: Message = {
    title: "Hola 👋",
    body: "Este es un push desde el core",
  };

  const result = await sendPush.execute(target, message);

  console.log("RESULTADO FINAL:");
  console.log(result);
}

main();
