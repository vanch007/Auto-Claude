import { useTranslation } from 'react-i18next';
import { Zap, Import, Radio } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';
import { StatusBadge } from './StatusBadge';
import { PasswordInput } from './PasswordInput';
import { ConnectionStatus } from './ConnectionStatus';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import type { ProjectEnvConfig, LinearSyncStatus } from '../../../shared/types';

interface LinearIntegrationSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  envConfig: ProjectEnvConfig;
  onUpdateConfig: (updates: Partial<ProjectEnvConfig>) => void;
  linearConnectionStatus: LinearSyncStatus | null;
  isCheckingLinear: boolean;
  onOpenImportModal: () => void;
}

export function LinearIntegrationSection({
  isExpanded,
  onToggle,
  envConfig,
  onUpdateConfig,
  linearConnectionStatus,
  isCheckingLinear,
  onOpenImportModal,
}: LinearIntegrationSectionProps) {
  const { t } = useTranslation('settings');

  const badge = envConfig.linearEnabled ? (
    <StatusBadge status="success" label={t('projectSettings.memory.enabled')} />
  ) : null;

  return (
    <CollapsibleSection
      title={t('projectSettings.linear.sectionTitle')}
      icon={<Zap className="h-4 w-4" />}
      isExpanded={isExpanded}
      onToggle={onToggle}
      badge={badge}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="font-normal text-foreground">{t('projectSettings.linear.enableSync')}</Label>
          <p className="text-xs text-muted-foreground">
            {t('projectSettings.linear.enableSyncDesc')}
          </p>
        </div>
        <Switch
          checked={envConfig.linearEnabled}
          onCheckedChange={(checked) => onUpdateConfig({ linearEnabled: checked })}
        />
      </div>

      {envConfig.linearEnabled && (
        <>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{t('projectSettings.linear.apiKey')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('projectSettings.linear.apiKeyDesc')}{' '}
              <a
                href="https://linear.app/settings/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-info hover:underline"
              >
                {t('projectSettings.linear.linearSettings')}
              </a>
            </p>
            <PasswordInput
              value={envConfig.linearApiKey || ''}
              onChange={(value) => onUpdateConfig({ linearApiKey: value })}
              placeholder="lin_api_xxxxxxxx"
            />
          </div>

          {/* Connection Status */}
          {envConfig.linearApiKey && (
            <ConnectionStatus
              isChecking={isCheckingLinear}
              isConnected={linearConnectionStatus?.connected || false}
              title={t('projectSettings.linear.connectionStatus')}
              successMessage={linearConnectionStatus?.teamName
                ? t('projectSettings.linear.connectedTo', { team: linearConnectionStatus.teamName })
                : t('common:status.connected')}
              errorMessage={linearConnectionStatus?.error || t('projectSettings.linear.notConnected')}
              additionalInfo={
                linearConnectionStatus?.connected && linearConnectionStatus.issueCount !== undefined
                  ? t('projectSettings.linear.tasksAvailable', { count: linearConnectionStatus.issueCount })
                  : undefined
              }
            />
          )}

          {/* Import Existing Tasks Button */}
          {linearConnectionStatus?.connected && (
            <div className="rounded-lg border border-info/30 bg-info/5 p-3">
              <div className="flex items-start gap-3">
                <Import className="h-5 w-5 text-info mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{t('projectSettings.linear.importTasks')}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('projectSettings.linear.selectIssuesDesc')}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={onOpenImportModal}
                  >
                    <Import className="h-4 w-4 mr-2" />
                    {t('projectSettings.linear.importFromLinear')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Real-time Sync Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-info" />
                <Label className="font-normal text-foreground">{t('projectSettings.linear.realtimeSync')}</Label>
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {t('projectSettings.linear.realtimeSyncDesc')}
              </p>
            </div>
            <Switch
              checked={envConfig.linearRealtimeSync || false}
              onCheckedChange={(checked) => onUpdateConfig({ linearRealtimeSync: checked })}
            />
          </div>

          {envConfig.linearRealtimeSync && (
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-3 ml-6">
              <p className="text-xs text-warning">
                {t('projectSettings.linear.realtimeSyncWarning')}
              </p>
            </div>
          )}

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">{t('projectSettings.linear.teamId')}</Label>
              <Input
                placeholder={t('projectSettings.linear.autoDetected')}
                value={envConfig.linearTeamId || ''}
                onChange={(e) => onUpdateConfig({ linearTeamId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">{t('projectSettings.linear.projectId')}</Label>
              <Input
                placeholder={t('projectSettings.linear.autoCreated')}
                value={envConfig.linearProjectId || ''}
                onChange={(e) => onUpdateConfig({ linearProjectId: e.target.value })}
              />
            </div>
          </div>
        </>
      )}
    </CollapsibleSection>
  );
}
