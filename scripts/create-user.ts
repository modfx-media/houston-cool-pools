import { config as loadEnv } from "dotenv";
import { getPayload } from "payload";

loadEnv({ path: ".env.local" });
loadEnv();

async function main() {
  const email = process.env.CMS_USER_EMAIL;
  const password = process.env.CMS_USER_PASSWORD;
  if (!email || !password) {
    console.error("Set CMS_USER_EMAIL and CMS_USER_PASSWORD.");
    process.exit(1);
  }
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) {
    console.error("DATABASE_URL and PAYLOAD_SECRET are required.");
    process.exit(1);
  }

  const { default: payloadConfig } = await import("../payload.config");
  const payload = await getPayload({ config: payloadConfig });
  const existing = await payload.find({
    collection: "users",
    limit: 1,
    overrideAccess: true,
    where: { email: { equals: email } },
  });
  if (existing.docs[0]) {
    console.log(`User already exists: ${email}`);
    return;
  }
  await payload.create({
    collection: "users",
    overrideAccess: true,
    data: { email, password },
  });
  console.log(`Created admin user ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
