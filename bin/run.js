let RostersProcess = require('../obj/src/container/RostersProcess').RostersProcess;

try {
    new RostersProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
