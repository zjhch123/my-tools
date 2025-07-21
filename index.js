import chalk from 'chalk';
import clipboard from 'clipboardy';
import osa from '@expo/osascript';
import path from 'path';
import os from 'os';
import { config } from 'dotenv';
import { program } from 'commander';

import { processText } from './src/index.js';

config({ quiet: true, path: path.join(os.homedir(), '.my-ai-tools', '.env') });

program
  .name('my-tools')
  .description('My Automator tools')
  .version('1.0.0');

program
  .command('process')
  .description('Process text content')
  .argument('<function>', 'Functions to be executed')
  .argument('<text>', 'Text to be operated')
  .action(async (functionName, text) => {
    try {
      const result = await processText(functionName, text);
      osa.execAsync(`
        set longContent to ${JSON.stringify(result)}
        display dialog "Result" default answer longContent with title "Result" buttons { "OK" } default button "OK"
      `);
      clipboard.writeSync(result);
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();
