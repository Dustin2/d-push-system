import { describe, it, expect, vi } from "vitest";

import { SendPush } from "./SendPush";

import { Message } from "../domain/Message";
import { Target } from "../domain/Target";

import { DeviceRepository } from "../ports/DeviceRepository";
import { PushProvider } from "../ports/PushProvider";
import { Device } from "../domain/Device";


describe("SendPush use case", () => {
  it("envía el mensaje a todos los dispositivos activos del usuario", async () => {
    const devices: Device[] = [
      {
        id: "device-1",
        userId: "user-1",
        provider: "fake",
        token: "token-1",
        active: true,
      },
      {
        id: "device-2",
        userId: "user-1",
        provider: "fake",
        token: "token-2",
        active: true,
      },
    ];

    const deviceRepo: DeviceRepository = {
      findByTarget: vi.fn().mockResolvedValue(devices),
      deactivate: vi.fn(),
    };

    const provider: PushProvider = {
      name: "fake",
      send: vi.fn(),
    };

    const sendPush = new SendPush(deviceRepo, [provider]);

    const message: Message = {
      title: "Hola",
      body: "Mensaje de prueba",
    };

    const target: Target = {
      kind: "user",
      id: "user-1",
    };

    await sendPush.execute(target, message);

    expect(provider.send).toHaveBeenCalledTimes(2);
    expect(provider.send).toHaveBeenCalledWith(message, "token-1");
    expect(provider.send).toHaveBeenCalledWith(message, "token-2");
  });
});
