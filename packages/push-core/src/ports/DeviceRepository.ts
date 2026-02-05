import { Device } from "../domain/Device";
import { Target } from "../domain/Target";

export interface DeviceRepository {
  findByTarget(target: Target): Promise<Device[]>;
  deactivate(deviceId: string): Promise<void>;
}
