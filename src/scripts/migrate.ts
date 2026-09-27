import { migrator, migratorTest, seeder, seederTest } from "../config/umzug.config";
import { getLog } from "../lib/context";
import { startMigrationSettingsSchema } from "../validators/schemas/common/start-migration-settings.schema";

const [type, env, mode, action, target] = process.argv.slice(2);

(async () => {

  const result = startMigrationSettingsSchema.safeParse({
    type, env, mode, action, target,
  });
  if (!result.success) {
    getLog().error("Incorrect parameters, use: migrate <migration|seed> <test|common> <all|target> <up|down> [target]");
    process.exit(1);
  }

  let umzug = undefined;
  switch (true) {
    case type === 'seed' && env === 'test':
      umzug = seederTest;
      break;
    case type === 'seed' && env === 'common':
      umzug = seeder;
      break;
    case type === 'migration' && env === 'test':
      umzug = migratorTest;
      break;
    case type === 'migration' && env === 'common':
      umzug = migrator;
      break;
  }

  if (!umzug) {
    getLog().error("Incorrect parameters");
    process.exit(1);
  }

  getLog().info(`${type} starting... CONFIG: ${env} ${mode} ${action} ${target ?? ""}`);
  switch (true) {
    case mode === 'all' && action === 'up':
      await umzug.up();
      break;
    case mode === 'all' && action === 'down':
      await umzug.down({ to: 0 });
      break;
    case mode === 'target' && action === 'up':
      await umzug.up({to: target});
      break;
    case mode === 'target' && action === 'down':
      await umzug.down({to: target});
      break;
  }

  getLog().info(`${type} done.`);
  process.exit(0);

})().catch(async(err) => {
  getLog().error(`${type} errors: ${err}`);
  getLog().warn(err);
  process.exit(1);
});