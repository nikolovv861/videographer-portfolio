import type { Client } from "@/lib/types";

export const clients: Client[] = Array.from({ length: 8 }, (_, i) => ({
  id: `client-${i + 1}`,
  name: `Client ${i + 1}`,
  logoUrl: "",
}));
