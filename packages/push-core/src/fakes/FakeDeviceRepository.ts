import { DeviceRepository } from "../ports/DeviceRepository";
import { Device } from "../domain/Device";
import { Target } from "../domain/Target";

export class FakeDeviceRepository implements DeviceRepository {
  private devices: Device[] = [
    {
      id: "device-1",
      userId: "user-1",
      provider: "fake",
      token: "token-abc",
      active: true,
    },
    {
      id: "device-2",
      userId: "user-1",
      provider: "fake",
      token: "token-def",
      active: true,
    },
  ];

  async findByTarget(target: Target): Promise<Device[]> {
    switch (target.kind) {
      case "user":
        return this.devices.filter((d) => d.userId === target.id && d.active);

      case "device":
        return this.devices.filter((d) => d.id === target.id && d.active);

      case "segment":
        return [];
    }
  }

  async deactivate(deviceId: string): Promise<void> {
    const device = this.devices.find((d) => d.id === deviceId);
    if (device) {
      device.active = false;
    }
  }
}
