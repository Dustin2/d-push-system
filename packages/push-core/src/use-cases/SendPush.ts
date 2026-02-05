import { DeviceRepository } from "../ports/DeviceRepository";
import { PushProvider } from "../ports/PushProvider";
import { Message } from "../domain/Message";
import { Target } from "../domain/Target";
import { DeliveryResult } from "../domain/Delivery";

export class SendPush {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly providers: PushProvider[],
  ) {}

  async execute(target: Target, message: Message): Promise<DeliveryResult[]> {
    const devices = await this.deviceRepository.findByTarget(target);

    const results: DeliveryResult[] = [];

    for (const device of devices) {
      const provider = this.providers.find((p) => p.name === device.provider);

      if (!provider) {
        results.push({
          deviceId: device.id,
          provider: device.provider,
          status: "failed",
          error: "Provider not found",
        });
        continue;
      }

      try {
        await provider.send(message, device.token);

        results.push({
          deviceId: device.id,
          provider: provider.name,
          status: "sent",
        });
      } catch (error) {
        await this.deviceRepository.deactivate(device.id);

        results.push({
          deviceId: device.id,
          provider: provider.name,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return results;
  }
}
