
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const NODE_ENV: string;
	export const _: string;
	export const XDG_SESSION_CLASS: string;
	export const XDG_MENU_PREFIX: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const LC_MEASUREMENT: string;
	export const SYSTEMD_EXEC_PID: string;
	export const DBUS_STARTER_BUS_TYPE: string;
	export const VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const MANAGERPID: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const SSH_AUTH_SOCK: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const PWD: string;
	export const PAGER: string;
	export const KDE_SESSION_VERSION: string;
	export const BAT_PAGER: string;
	export const LESSOPEN: string;
	export const MANPAGER: string;
	export const XDG_DATA_DIRS: string;
	export const XDG_SEAT_PATH: string;
	export const GTK_MODULES: string;
	export const npm_config_userconfig: string;
	export const XDG_SESSION_TYPE: string;
	export const LC_MONETARY: string;
	export const npm_config_prefix: string;
	export const SBX_CHROME_API_RQ: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const SYSTEMD_PAGER: string;
	export const COLORTERM: string;
	export const npm_config_user_agent: string;
	export const COLOR: string;
	export const NVM_CD_FLAGS: string;
	export const GIT_ASKPASS: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const GPG_AGENT_INFO: string;
	export const XKB_DEFAULT_MODEL: string;
	export const npm_command: string;
	export const XDG_SEAT: string;
	export const MANAGERPIDFDID: string;
	export const LANGUAGE: string;
	export const NVM_DIR: string;
	export const GDK_BACKEND: string;
	export const JAVA_HOME: string;
	export const npm_package_json: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const NVM_BIN: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const DELTA_PAGER: string;
	export const PTYXIS_VERSION: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CONFIG_DIRS: string;
	export const ANDROID_SDK_ROOT: string;
	export const DEBUGINFOD_URLS: string;
	export const INIT_CWD: string;
	export const OLDPWD: string;
	export const LC_NUMERIC: string;
	export const GTK_RC_FILES: string;
	export const DESKTOP_SESSION: string;
	export const npm_package_name: string;
	export const npm_config_local_prefix: string;
	export const VTE_VERSION: string;
	export const QT_WAYLAND_RECONNECT: string;
	export const OPENAI_API_KEY: string;
	export const XAUTHORITY: string;
	export const npm_config_npm_version: string;
	export const npm_config_noproxy: string;
	export const npm_config_global_prefix: string;
	export const CHROME_DESKTOP: string;
	export const KDE_APPLICATIONS_AS_SCOPE: string;
	export const DBUS_STARTER_ADDRESS: string;
	export const USER: string;
	export const NVM_INC: string;
	export const XDG_SESSION_ID: string;
	export const FC_FONTATIONS: string;
	export const GTK2_RC_FILES: string;
	export const FLATPAK_TTY_PROGRESS: string;
	export const npm_config_node_gyp: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const LOGNAME: string;
	export const SHELL: string;
	export const PATH: string;
	export const LC_TIME: string;
	export const ICEAUTHORITY: string;
	export const HOME: string;
	export const TERM_PROGRAM_VERSION: string;
	export const KDE_SESSION_UID: string;
	export const WAYLAND_DISPLAY: string;
	export const SESSION_MANAGER: string;
	export const SHLVL: string;
	export const AWS_PAGER: string;
	export const LC_ADDRESS: string;
	export const INVOCATION_ID: string;
	export const XKB_DEFAULT_LAYOUT: string;
	export const TERM: string;
	export const npm_config_cache: string;
	export const NODE: string;
	export const npm_node_execpath: string;
	export const PROMPT_COMMAND: string;
	export const SVELTEKIT_FORK: string;
	export const PTYXIS_PROFILE: string;
	export const LESSCLOSE: string;
	export const KDE_FULL_SESSION: string;
	export const XDG_RUNTIME_DIR: string;
	export const DISPLAY: string;
	export const LANG: string;
	export const EDITOR: string;
	export const LC_TELEPHONE: string;
	export const LC_PAPER: string;
	export const OPENAI_BASE_URL: string;
	export const GH_PAGER: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LS_COLORS: string;
	export const TERM_PROGRAM: string;
	export const npm_lifecycle_script: string;
	export const LC_NAME: string;
	export const npm_lifecycle_event: string;
	export const QT_ACCESSIBILITY: string;
	export const npm_config_init_module: string;
	export const Q_TERM_DISABLED: string;
	export const GIT_PAGER: string;
	export const IM_CONFIG_ENTRY: string;
	export const XDG_VTNR: string;
	export const npm_config_globalconfig: string;
	export const XDG_SESSION_PATH: string;
	export const npm_execpath: string;
	export const npm_package_version: string;
	export const ANDROID_HOME: string;
	export const npm_config_allow_scripts: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		NODE_ENV: string;
		_: string;
		XDG_SESSION_CLASS: string;
		XDG_MENU_PREFIX: string;
		XDG_CURRENT_DESKTOP: string;
		LC_MEASUREMENT: string;
		SYSTEMD_EXEC_PID: string;
		DBUS_STARTER_BUS_TYPE: string;
		VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
		MEMORY_PRESSURE_WRITE: string;
		MANAGERPID: string;
		VSCODE_GIT_IPC_HANDLE: string;
		SSH_AUTH_SOCK: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		PWD: string;
		PAGER: string;
		KDE_SESSION_VERSION: string;
		BAT_PAGER: string;
		LESSOPEN: string;
		MANPAGER: string;
		XDG_DATA_DIRS: string;
		XDG_SEAT_PATH: string;
		GTK_MODULES: string;
		npm_config_userconfig: string;
		XDG_SESSION_TYPE: string;
		LC_MONETARY: string;
		npm_config_prefix: string;
		SBX_CHROME_API_RQ: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		SYSTEMD_PAGER: string;
		COLORTERM: string;
		npm_config_user_agent: string;
		COLOR: string;
		NVM_CD_FLAGS: string;
		GIT_ASKPASS: string;
		PAM_KWALLET5_LOGIN: string;
		GPG_AGENT_INFO: string;
		XKB_DEFAULT_MODEL: string;
		npm_command: string;
		XDG_SEAT: string;
		MANAGERPIDFDID: string;
		LANGUAGE: string;
		NVM_DIR: string;
		GDK_BACKEND: string;
		JAVA_HOME: string;
		npm_package_json: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		NVM_BIN: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		DELTA_PAGER: string;
		PTYXIS_VERSION: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CONFIG_DIRS: string;
		ANDROID_SDK_ROOT: string;
		DEBUGINFOD_URLS: string;
		INIT_CWD: string;
		OLDPWD: string;
		LC_NUMERIC: string;
		GTK_RC_FILES: string;
		DESKTOP_SESSION: string;
		npm_package_name: string;
		npm_config_local_prefix: string;
		VTE_VERSION: string;
		QT_WAYLAND_RECONNECT: string;
		OPENAI_API_KEY: string;
		XAUTHORITY: string;
		npm_config_npm_version: string;
		npm_config_noproxy: string;
		npm_config_global_prefix: string;
		CHROME_DESKTOP: string;
		KDE_APPLICATIONS_AS_SCOPE: string;
		DBUS_STARTER_ADDRESS: string;
		USER: string;
		NVM_INC: string;
		XDG_SESSION_ID: string;
		FC_FONTATIONS: string;
		GTK2_RC_FILES: string;
		FLATPAK_TTY_PROGRESS: string;
		npm_config_node_gyp: string;
		MEMORY_PRESSURE_WATCH: string;
		LOGNAME: string;
		SHELL: string;
		PATH: string;
		LC_TIME: string;
		ICEAUTHORITY: string;
		HOME: string;
		TERM_PROGRAM_VERSION: string;
		KDE_SESSION_UID: string;
		WAYLAND_DISPLAY: string;
		SESSION_MANAGER: string;
		SHLVL: string;
		AWS_PAGER: string;
		LC_ADDRESS: string;
		INVOCATION_ID: string;
		XKB_DEFAULT_LAYOUT: string;
		TERM: string;
		npm_config_cache: string;
		NODE: string;
		npm_node_execpath: string;
		PROMPT_COMMAND: string;
		SVELTEKIT_FORK: string;
		PTYXIS_PROFILE: string;
		LESSCLOSE: string;
		KDE_FULL_SESSION: string;
		XDG_RUNTIME_DIR: string;
		DISPLAY: string;
		LANG: string;
		EDITOR: string;
		LC_TELEPHONE: string;
		LC_PAPER: string;
		OPENAI_BASE_URL: string;
		GH_PAGER: string;
		XDG_SESSION_DESKTOP: string;
		LS_COLORS: string;
		TERM_PROGRAM: string;
		npm_lifecycle_script: string;
		LC_NAME: string;
		npm_lifecycle_event: string;
		QT_ACCESSIBILITY: string;
		npm_config_init_module: string;
		Q_TERM_DISABLED: string;
		GIT_PAGER: string;
		IM_CONFIG_ENTRY: string;
		XDG_VTNR: string;
		npm_config_globalconfig: string;
		XDG_SESSION_PATH: string;
		npm_execpath: string;
		npm_package_version: string;
		ANDROID_HOME: string;
		npm_config_allow_scripts: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
