export interface DeliveryResult {
  deviceId: string;
  provider: string;
  status: "sent" | "failed";
  error?: string;
}
