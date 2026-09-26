import { migrator } from "../config/umzug.config";
import { getLog } from "../lib/context";

(async () => {
  await migrator.up();
  getLog().info("Migrations done");
  process.exit(0);
})().catch((err) => {
  getLog().error(`Migrations errors: ${err}`);
  process.exit(1);
});