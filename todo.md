https://byby.dev/at-rule-tailwind -> Extensions and configs for using tailwind with vscode
[ok] - Test error handling when server fails
[ok] - Create settings control (modal)
[ok] - Edit README
[ok] - Use form and state values in settings form
[ok] - Check how to share state between backend and frontend
[ok] - Make parameter selection form
[ok] - Verify if Atom values for grid params can be scalar or always converted to lists
(always convert to lists)
[ok] - Disable submit when queries are running (maybe add spinning icon)
[ok] - Improve collapsible that displays params, and other metadata
[ok] - Segregate spinner into its own component
[ok] - Add loader/spinner inside each result component
[ok] - Add fixed header to results pannel with controls to expand/collapse metadata in all inferences
[ok] - Add button to cancel/stop experiment
[ok] - Add confirmation dialog when stopping experiment
[ok] - Use Ollama server from settings in get_models and get inference
[ok] - refetch get_models periodically or add icon to refetch -> every 30s
[ok] - Use system prompt + user defined params and default params when invoking the completion API
[ok] - Move commands and utility functions to commands.rs and lib.rs
[ok] - Make desktop the default app, save old one
[ok] - Rename "desktop" id in Cargo.toml to grid-search-desktop
[ok] - Return full response from inference (after ollama-rs version bump)
[ok] - Add response metadata to results

- Format result's metadata in the frontend

- Consider what to do when updating settings (reset everything? just reset the form? see settings-dialog.tsx)
- Convert markdown in responses

- Redo README (add pics!)

- Log responses to a log file?
- Test a multiplatform release
- Implement single instance check https://github.com/tauri-apps/plugins-workspace/tree/v1/plugins/single-instance

---

- Plan on saving results to SQLite
- Add movable divider component
- Add keyboard shortcuts
- Add a "default prompt" setting to settings?
- Verify if upstream issues with the "stop" option have been resolved (ommited until then)

- Cancel async commands:
  https://github.com/tauri-apps/tauri/discussions/5894
  https://github.com/tauri-apps/tauri/issues/8351