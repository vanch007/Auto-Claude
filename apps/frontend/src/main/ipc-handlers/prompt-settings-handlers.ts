/**
 * IPC handlers for custom prompt settings.
 * Manages loading and saving of custom-prompts.json file.
 */
import { ipcMain, app } from 'electron';
import * as fs from 'node:fs';
import * as path from 'node:path';

interface CustomPrompts {
    systemPromptExtension: string;
    coderPromptExtension: string;
    plannerPromptExtension: string;
    qaPromptExtension: string;
    enabled: boolean;
}

const DEFAULT_PROMPTS: CustomPrompts = {
    systemPromptExtension: '',
    coderPromptExtension: '',
    plannerPromptExtension: '',
    qaPromptExtension: '',
    enabled: true,
};

function getCustomPromptsPath(): string {
    return path.join(app.getPath('userData'), 'custom-prompts.json');
}

export function registerPromptSettingsHandlers(): void {
    // Load custom prompts
    ipcMain.handle('CUSTOM_PROMPTS_LOAD', async () => {
        try {
            const filePath = getCustomPromptsPath();
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                return JSON.parse(content);
            }
            return DEFAULT_PROMPTS;
        } catch (error) {
            console.error('[prompt-settings] Error loading custom prompts:', error);
            return DEFAULT_PROMPTS;
        }
    });

    // Save custom prompts
    ipcMain.handle('CUSTOM_PROMPTS_SAVE', async (_event, prompts: CustomPrompts) => {
        try {
            const filePath = getCustomPromptsPath();
            fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2), 'utf-8');
            return { success: true };
        } catch (error) {
            console.error('[prompt-settings] Error saving custom prompts:', error);
            return { success: false, error: String(error) };
        }
    });
}
