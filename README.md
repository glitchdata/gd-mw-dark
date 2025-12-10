# DarkMode MediaWiki Extension

A lightweight MediaWiki extension that adds a site-wide dark mode with a persistent toggle and optional per-user preference.

## Features
- Adds a dark theme layer and toggle visible in the personal toolbar (or footer fallback).
- Remembers the toggle via local storage and honors `prefers-color-scheme: dark` on first load.
- Provides a user preference (`Enable dark mode by default`) so logged-in users can set a default in Special:Preferences.

## Installation
1. Copy this repository into your MediaWiki `extensions` directory as `DarkMode`.
2. Add to `LocalSettings.php`:

```php
wfLoadExtension( 'DarkMode' );
```

3. Run `php maintenance/update.php` if prompted for message cache rebuilds.
4. Clear caches (e.g., `$wgMainCacheType`/`$wgCacheDirectory`) to ensure new resources load.

## Usage
- Use the toggle in the personal tools area to switch themes; the choice is remembered locally.
- Logged-in users can set a default in **Preferences → Appearance → Colors** via the provided checkbox.

## Configuration
No custom configuration flags are required. The module loads on every page and targets both desktop and mobile skins. Adjust `resources/darkmode.less` to align with your skin palette.

## License
MIT
