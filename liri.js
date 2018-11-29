require("dotenv").config();
var botCommands = require('./botCommands');

var commandName = process.argv[2];
if(!Object.keys(botCommands).includes(commandName)) {
  console.log('Not a valid command');
  return;
}

var argumentValue = process.argv[3];
botCommands[commandName](argumentValue);
