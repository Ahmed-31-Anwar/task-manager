import "temporal-polyfill/global";
import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "../../prisma/contract.d.ts";
import contractJson from "../../prisma/contract.json" with { type: "json" };

const client = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL!,
});

const runtime = await client.connect();

export const db = {
  ...client,
  runtime,
};

