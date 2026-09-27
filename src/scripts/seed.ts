import { seeder } from "../config/umzug.config.js";
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
    getLog().info("Empty seed name");
    process.exit(1);
  }

  if (!availableActions.includes(action)) {
    getLog().info("Incorrect acctions. Only available: up | down");
    process.exit(1);
  }

  getLog().info(`Seed start. CONFIG: ${mode} ${action} ${target ?? ""}`);

  if (mode == "all" && action == "down") {
    await seeder.down({ to: 0 });
  } 
  else if (mode == "all" && action == "up") {
    await seeder.up();
  }
  
  if (mode == "target" && action == "down") {
    await seeder.down({ to: target });
  } 
  else if (mode == "target" && action == "up") {
    await seeder.up({to: target});
  }
  getLog().info("Seed done");
  process.exit(0);
})().catch(async(err) => {
  getLog().error(`Seed errors: ${err}`);
  process.exit(1);
});