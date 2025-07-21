#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';

/**
 * Get configuration directory path
 * @returns {string} Full path to configuration directory
 */
function getConfigDir() {
  return path.join(os.homedir(), '.my-ai-tools');
}

/**
 * Get .env file path
 * @returns {string} Full path to .env file
 */
function getEnvFilePath() {
  return path.join(getConfigDir(), '.env');
}

/**
 * Ensure configuration directory exists
 * @param {string} configDir - Configuration directory path
 */
function ensureConfigDirExists(configDir) {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    console.log(chalk.green(`✅ Created configuration directory: ${configDir}`));
  }
}

/**
 * Write environment variables to .env file
 * @param {string} envFilePath - Path to .env file
 * @param {string} azureOpenaiUrl - Azure OpenAI URL
 * @param {string} azureOpenaiApiKey - Azure OpenAI API Key
 */
function writeEnvFile(envFilePath, azureOpenaiUrl, azureOpenaiApiKey) {
  const envContent = `# Azure OpenAI Configuration
AZURE_OPENAI_URL=${azureOpenaiUrl}
AZURE_OPENAI_API_KEY=${azureOpenaiApiKey}
`;

  fs.writeFileSync(envFilePath, envContent, 'utf8');
  console.log(chalk.green(`✅ Configuration saved to: ${envFilePath}`));
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean|string} Returns true if valid, error message if invalid
 */
function validateUrl(url) {
  if (!url || url.trim() === '') {
    return 'URL cannot be empty';
  }
  try {
    new URL(url);
    return true;
  } catch {
    return 'Please enter a valid URL format';
  }
}

/**
 * Validate API Key format
 * @param {string} apiKey - API Key to validate
 * @returns {boolean|string} Returns true if valid, error message if invalid
 */
function validateApiKey(apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    return 'API Key cannot be empty';
  }
  if (apiKey.length < 10) {
    return 'API Key must be at least 10 characters long';
  }
  return true;
}

/**
 * Check if configuration file already exists
 * @returns {boolean} Whether configuration file exists
 */
function hasExistingConfig() {
  return fs.existsSync(getEnvFilePath());
}

/**
 * Main setup function
 */
async function setupConfig() {
  console.log(chalk.cyan.bold('🚀 Azure OpenAI Configuration Wizard'));
  console.log(chalk.gray('This will help you configure Azure OpenAI connection settings\n'));

  try {
    // Check if configuration already exists
    if (hasExistingConfig()) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'Existing configuration detected. Do you want to overwrite it?',
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('🚫 Configuration cancelled, existing settings preserved'));
        return;
      }
    }

    // Use inquirer to get configuration information
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'azureOpenaiUrl',
        message: 'Please enter Azure OpenAI URL:',
        validate: validateUrl,
        filter: (input) => input.trim(),
      },
      {
        type: 'password',
        name: 'azureOpenaiApiKey',
        message: 'Please enter Azure OpenAI API Key:',
        validate: validateApiKey,
        mask: '*',
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Confirm saving the above configuration?',
        default: true,
      },
    ]);

    if (!answers.confirm) {
      console.log(chalk.yellow('🚫 Configuration save cancelled'));
      return;
    }

    // Ensure configuration directory exists
    const configDir = getConfigDir();
    ensureConfigDirExists(configDir);

    // Write configuration file
    const envFilePath = getEnvFilePath();
    writeEnvFile(envFilePath, answers.azureOpenaiUrl, answers.azureOpenaiApiKey);

    console.log(chalk.green.bold('\n🎉 Configuration completed!'));
    console.log(chalk.gray(`Configuration file location: ${envFilePath}`));
    console.log(chalk.cyan('You can now use my-tools commands!'));

  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('❌ Cannot run interactive commands in current environment'));
    } else {
      console.error(chalk.red(`❌ Error during configuration: ${error.message}`));
    }
    process.exit(1);
  }
}

setupConfig();
