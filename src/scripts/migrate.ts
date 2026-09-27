import { migrator } from "../config/umzug.config.js";
import { getLog } from "../lib/context.js";

const mode = process.argv[2]; 
const action = process.argv[3];
const target = process.argv[4];

const availableModes = ['all', 'target'];
const availableActions = ['up', 'down'];

(async () => {

  if (!availableModes.includes(mode)) {
    getLog().info("Incorrect mode. Only available: all | target");
    process.exit(1);
  }

  if (mode == 'target' && !target) {
    getLog().info("Empty migration name");
    process.exit(1);
  }

  if (!availableActions.includes(action)) {
    getLog().info("Incorrect acctions. Only available: up | down");
    process.exit(1);
  }

  getLog().info(`Migrations start. CONFIG: ${mode} ${action} ${target ?? ""}`);

  if (mode == "all" && action == "down") {
    await migrator.down({ to: 0 });
  } 
  else if (mode == "all" && action == "up") {
    await migrator.up();
  }
  
  if (mode == "target" && action == "down") {
    await migrator.down({ to: target });
  } 
  else if (mode == "target" && action == "up") {
    await migrator.up({to: target});
  }

  getLog().info("Migrations done");
  process.exit(0);
})().catch(async(err) => {
  getLog().error(`Migrations errors: ${err}`);
  process.exit(1);
});