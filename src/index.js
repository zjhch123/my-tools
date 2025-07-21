import { getResponse } from './utils/gpt-utils.js';
import { createSummarizePrompt, createTranslationPrompt, createBetterGrammarPrompt }  from './utils/prompt-utils.js';

/**
 * @enum {string}
 */
const SupportedFunction = {
  TRANSLATE_ZH_EN: 'translate_zh_en',
  TRANSLATE_EN_ZH: 'translate_en_zh',
  SUMMARIZE_TO_EN: 'summarize_to_en',
  SUMMARIZE_TO_ZH: 'summarize_to_zh',
  BETTER_GRAMMAR: 'better_grammar',
};

/**
 * @param {SupportedFunction} functionName
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function processText(functionName, text) {
  switch (functionName) {
  case SupportedFunction.TRANSLATE_ZH_EN:
    return await getResponse(createTranslationPrompt('English', text), text);
  case SupportedFunction.TRANSLATE_EN_ZH:
    return await getResponse(createTranslationPrompt('Chinese', text), text);
  case SupportedFunction.SUMMARIZE_TO_EN:
    return await getResponse(createSummarizePrompt('English'), text);
  case SupportedFunction.SUMMARIZE_TO_ZH:
    return await getResponse(createSummarizePrompt('Chinese'), text);
  case SupportedFunction.BETTER_GRAMMAR:
    return await getResponse(createBetterGrammarPrompt(text), text);
  }
}
