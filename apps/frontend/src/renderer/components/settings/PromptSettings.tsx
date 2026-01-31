import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw, Info, ChevronDown, ChevronRight } from 'lucide-react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { SettingsSection } from './SettingsSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

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

export function PromptSettings() {
    const { t } = useTranslation('settings');
    const [prompts, setPrompts] = useState<CustomPrompts>(DEFAULT_PROMPTS);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [isAgentPromptsOpen, setIsAgentPromptsOpen] = useState(false);

    // Load custom prompts on mount
    useEffect(() => {
        const loadPrompts = async () => {
            try {
                const saved = await window.electronAPI.loadCustomPrompts();
                if (saved) {
                    setPrompts({ ...DEFAULT_PROMPTS, ...saved });
                }
            } catch (error) {
                console.error('Failed to load custom prompts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadPrompts();
    }, []);

    // Auto-save when prompts change (debounced)
    useEffect(() => {
        if (isLoading) return;

        const timer = setTimeout(async () => {
            try {
                await window.electronAPI.saveCustomPrompts(prompts);
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 2000);
            } catch (error) {
                console.error('Failed to save custom prompts:', error);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [prompts, isLoading]);

    const handleReset = () => {
        setPrompts(DEFAULT_PROMPTS);
    };

    const updatePrompt = (key: keyof CustomPrompts, value: string | boolean) => {
        setPrompts(prev => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-pulse text-muted-foreground">
                    {t('common:status.loading', 'Loading...')}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SettingsSection
                title={t('sections.prompts.title')}
                description={t('sections.prompts.description')}
            >
                {/* Enable/Disable Toggle */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                    <div className="space-y-0.5">
                        <Label className="text-base">{t('prompts.enableCustomPrompts')}</Label>
                        <p className="text-sm text-muted-foreground">
                            {t('prompts.enableCustomPromptsDescription')}
                        </p>
                    </div>
                    <Switch
                        checked={prompts.enabled}
                        onCheckedChange={(checked) => updatePrompt('enabled', checked)}
                    />
                </div>

                {/* Info Banner */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="text-sm text-muted-foreground">
                        <p>{t('prompts.infoText')}</p>
                    </div>
                </div>

                {/* System Prompt Extension - Main */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="system-prompt" className="text-base font-medium">
                            {t('prompts.systemPrompt')}
                        </Label>
                        {isSaved && (
                            <span className="text-xs text-green-500">
                                {t('prompts.saved')}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {t('prompts.systemPromptDescription')}
                    </p>
                    <Textarea
                        id="system-prompt"
                        value={prompts.systemPromptExtension}
                        onChange={(e) => updatePrompt('systemPromptExtension', e.target.value)}
                        placeholder={t('prompts.systemPromptPlaceholder')}
                        className="min-h-[200px] font-mono text-sm"
                        disabled={!prompts.enabled}
                    />
                </div>

                {/* Agent-specific Prompts (Collapsible) */}
                <Collapsible open={isAgentPromptsOpen} onOpenChange={setIsAgentPromptsOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                            <span className="text-base font-medium">{t('prompts.agentSpecificPrompts')}</span>
                            {isAgentPromptsOpen ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-6 pt-4 px-4">
                        {/* Coder Prompt */}
                        <div className="space-y-2">
                            <Label htmlFor="coder-prompt">{t('prompts.coderPrompt')}</Label>
                            <p className="text-sm text-muted-foreground">
                                {t('prompts.coderPromptDescription')}
                            </p>
                            <Textarea
                                id="coder-prompt"
                                value={prompts.coderPromptExtension}
                                onChange={(e) => updatePrompt('coderPromptExtension', e.target.value)}
                                placeholder={t('prompts.coderPromptPlaceholder')}
                                className="min-h-[120px] font-mono text-sm"
                                disabled={!prompts.enabled}
                            />
                        </div>

                        {/* Planner Prompt */}
                        <div className="space-y-2">
                            <Label htmlFor="planner-prompt">{t('prompts.plannerPrompt')}</Label>
                            <p className="text-sm text-muted-foreground">
                                {t('prompts.plannerPromptDescription')}
                            </p>
                            <Textarea
                                id="planner-prompt"
                                value={prompts.plannerPromptExtension}
                                onChange={(e) => updatePrompt('plannerPromptExtension', e.target.value)}
                                placeholder={t('prompts.plannerPromptPlaceholder')}
                                className="min-h-[120px] font-mono text-sm"
                                disabled={!prompts.enabled}
                            />
                        </div>

                        {/* QA Prompt */}
                        <div className="space-y-2">
                            <Label htmlFor="qa-prompt">{t('prompts.qaPrompt')}</Label>
                            <p className="text-sm text-muted-foreground">
                                {t('prompts.qaPromptDescription')}
                            </p>
                            <Textarea
                                id="qa-prompt"
                                value={prompts.qaPromptExtension}
                                onChange={(e) => updatePrompt('qaPromptExtension', e.target.value)}
                                placeholder={t('prompts.qaPromptPlaceholder')}
                                className="min-h-[120px] font-mono text-sm"
                                disabled={!prompts.enabled}
                            />
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                {/* Reset Button */}
                <div className="flex justify-end pt-4 border-t border-border">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="gap-2"
                    >
                        <RotateCcw className="h-4 w-4" />
                        {t('prompts.reset')}
                    </Button>
                </div>
            </SettingsSection>
        </div>
    );
}
