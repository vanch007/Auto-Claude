import { useTranslation } from 'react-i18next';
import { Key, ExternalLink, Loader2, Globe } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';
import { StatusBadge } from './StatusBadge';
import { PasswordInput } from './PasswordInput';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import type { ProjectEnvConfig } from '../../../shared/types';

interface ClaudeAuthSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  envConfig: ProjectEnvConfig | null;
  isLoadingEnv: boolean;
  envError: string | null;
  isCheckingAuth: boolean;
  authStatus: 'checking' | 'authenticated' | 'not_authenticated' | 'error';
  onClaudeSetup: () => void;
  onUpdateConfig: (updates: Partial<ProjectEnvConfig>) => void;
}

export function ClaudeAuthSection({
  isExpanded,
  onToggle,
  envConfig,
  isLoadingEnv,
  envError,
  isCheckingAuth,
  authStatus,
  onClaudeSetup,
  onUpdateConfig,
}: ClaudeAuthSectionProps) {
  const { t } = useTranslation('common');

  const badge = authStatus === 'authenticated' ? (
    <StatusBadge status="success" label={t('status.connected')} />
  ) : authStatus === 'not_authenticated' ? (
    <StatusBadge status="warning" label={t('status.notConnected')} />
  ) : null;

  return (
    <CollapsibleSection
      title={t('auth.claudeAuthentication')}
      icon={<Key className="h-4 w-4" />}
      isExpanded={isExpanded}
      onToggle={onToggle}
      badge={badge}
    >
      {isLoadingEnv ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t('status.loadingConfiguration')}
        </div>
      ) : envConfig ? (
        <>
          {/* Claude CLI Status */}
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Claude CLI</p>
                <p className="text-xs text-muted-foreground">
                  {isCheckingAuth ? t('status.checking') :
                    authStatus === 'authenticated' ? t('auth.authenticatedViaOAuth') :
                      authStatus === 'not_authenticated' ? t('auth.notAuthenticated') :
                        t('status.unknown')}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={onClaudeSetup}
                disabled={isCheckingAuth}
              >
                {isCheckingAuth ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {authStatus === 'authenticated' ? t('auth.reAuthenticate') : t('auth.setupOAuth')}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Manual OAuth Token */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">
                {t('auth.oauthToken')} {envConfig.claudeTokenIsGlobal ? t('auth.override') : ''}
              </Label>
              {envConfig.claudeTokenIsGlobal && (
                <span className="flex items-center gap-1 text-xs text-info">
                  <Globe className="h-3 w-3" />
                  {t('auth.usingGlobalToken')}
                </span>
              )}
            </div>
            {envConfig.claudeTokenIsGlobal ? (
              <p className="text-xs text-muted-foreground">
                {t('auth.usingTokenFromAppSettings')}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                {t('auth.pasteTokenHint')}
              </p>
            )}
            <PasswordInput
              value={envConfig.claudeTokenIsGlobal ? '' : (envConfig.claudeOAuthToken || '')}
              onChange={(value) => onUpdateConfig({
                claudeOAuthToken: value || undefined,
              })}
              placeholder={envConfig.claudeTokenIsGlobal ? t('auth.enterToOverride') : t('auth.tokenPlaceholder')}
            />
          </div>
        </>
      ) : envError ? (
        <p className="text-sm text-destructive">{envError}</p>
      ) : null}
    </CollapsibleSection>
  );
}

