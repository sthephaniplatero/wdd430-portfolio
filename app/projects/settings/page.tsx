export default function ProjectsSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Preferences</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink">Projects Settings</h2>
        <p className="mt-2 text-ink-muted">
          Configure display preferences, project visibility filters, and external repository sync options.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface-200 p-6 space-y-6 max-w-2xl">
        <div>
          <h3 className="text-lg font-bold text-ink">Catalog Display Preferences</h3>
          <p className="text-sm text-ink-muted">Manage how projects are grouped and displayed across views.</p>
        </div>

        <div className="space-y-4 pt-2">
          <label className="flex items-center justify-between p-3 rounded-lg border border-border/80 bg-surface-100/50 cursor-pointer hover:bg-surface-100">
            <div>
              <span className="font-medium text-sm text-ink block">Show Technology Badges</span>
              <span className="text-xs text-ink-muted">Display tech stack pills on project cards</span>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-brand" />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-border/80 bg-surface-100/50 cursor-pointer hover:bg-surface-100">
            <div>
              <span className="font-medium text-sm text-ink block">Enable GitHub Repo Sync</span>
              <span className="text-xs text-ink-muted">Automatically fetch star counts and latest commits</span>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-brand" />
          </label>
        </div>
      </div>
    </div>
  );
}
