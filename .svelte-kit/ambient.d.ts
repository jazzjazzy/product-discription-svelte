
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const DB_CONNECTION: string;
	export const DB_HOST: string;
	export const DB_PORT: string;
	export const DB_DATABASE: string;
	export const DB_USERNAME: string;
	export const DB_PASSWORD: string;
	export const GOOGLE_CLIENT_ID: string;
	export const GOOGLE_CLIENT_SECRET: string;
	export const FACEBOOK_CLIENT_ID: string;
	export const FACEBOOK_CLIENT_SECRET: string;
	export const DATABASE_URL: string;
	export const BUCKET_URL: string;
	export const BUCKET_NAME: string;
	export const BUCKET_KEY_FILE: string;
	export const SEGMIND_ESRGAN_URL: string;
	export const SEGMIND_KEY: string;
	export const OPENAI_API_KEY: string;
	export const REPLICATE_API_TOKEN: string;
	export const SECRET_STRIPE_KEY: string;
	export const DOMAIN: string;
	export const GJS_DEBUG_TOPICS: string;
	export const NOW_BUILDER: string;
	export const CONDA_PROMPT_MODIFIER: string;
	export const VERCEL_GIT_REPO_OWNER: string;
	export const LANGUAGE: string;
	export const USER: string;
	export const npm_config_user_agent: string;
	export const XDG_SEAT: string;
	export const TURBO_RUN_SUMMARY: string;
	export const XDG_SESSION_TYPE: string;
	export const GIT_ASKPASS: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const npm_config_noproxy: string;
	export const HOME: string;
	export const CHROME_DESKTOP: string;
	export const OLDPWD: string;
	export const LESS: string;
	export const CONDA_SHLVL: string;
	export const DESKTOP_SESSION: string;
	export const NVM_BIN: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_json: string;
	export const GIO_LAUNCHED_DESKTOP_FILE: string;
	export const ZSH: string;
	export const LSCOLORS: string;
	export const NVM_INC: string;
	export const VERCEL_ENV: string;
	export const GTK_MODULES: string;
	export const XDG_SEAT_PATH: string;
	export const PAGER: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const CINNAMON_VERSION: string;
	export const npm_config_engine_strict: string;
	export const npm_config_resolution_mode: string;
	export const GIO_LAUNCHED_DESKTOP_FILE_PID: string;
	export const COLORTERM: string;
	export const _CE_M: string;
	export const VERCEL_GIT_COMMIT_SHA: string;
	export const VERCEL_GIT_PULL_REQUEST_ID: string;
	export const COLOR: string;
	export const INSIDE_NEMO_PYTHON: string;
	export const NVM_DIR: string;
	export const VERCEL_GIT_COMMIT_REF: string;
	export const npm_config_metrics_registry: string;
	export const MANDATORY_PATH: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const LOGNAME: string;
	export const VERCEL_GIT_PROVIDER: string;
	export const _: string;
	export const npm_config_prefix: string;
	export const XDG_SESSION_CLASS: string;
	export const DEFAULTS_PATH: string;
	export const USER_ZDOTDIR: string;
	export const XDG_SESSION_ID: string;
	export const TERM: string;
	export const VERCEL_URL: string;
	export const npm_config_cache: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const _CE_CONDA: string;
	export const VERCEL_GIT_COMMIT_AUTHOR_NAME: string;
	export const VERCEL_GIT_REPO_ID: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const GDM_LANG: string;
	export const GTK3_MODULES: string;
	export const SESSION_MANAGER: string;
	export const TURBO_REMOTE_ONLY: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const XDG_SESSION_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const GDK_BACKEND: string;
	export const GNOME_TERMINAL_SCREEN: string;
	export const DISPLAY: string;
	export const LANG: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const VSCODE_INJECTION: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XAUTHORITY: string;
	export const GNOME_TERMINAL_SERVICE: string;
	export const LS_COLORS: string;
	export const TERM_PROGRAM: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const __VERCEL_BUILD_RUNNING: string;
	export const npm_lifecycle_script: string;
	export const XDG_GREETER_DATA_DIR: string;
	export const SSH_AUTH_SOCK: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const CONDA_PYTHON_EXE: string;
	export const SHELL: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const QT_ACCESSIBILITY: string;
	export const GDMSESSION: string;
	export const NO_AT_BRIDGE: string;
	export const CONDA_DEFAULT_ENV: string;
	export const VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string;
	export const GPG_AGENT_INFO: string;
	export const GJS_DEBUG_OUTPUT: string;
	export const VERCEL: string;
	export const XDG_VTNR: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const npm_execpath: string;
	export const XDG_CONFIG_DIRS: string;
	export const XDG_DATA_DIRS: string;
	export const NVM_CD_FLAGS: string;
	export const CONDA_EXE: string;
	export const ZDOTDIR: string;
	export const NX_DAEMON: string;
	export const npm_config_global_prefix: string;
	export const npm_command: string;
	export const CONDA_PREFIX: string;
	export const VERCEL_GIT_COMMIT_MESSAGE: string;
	export const VERCEL_GIT_PREVIOUS_SHA: string;
	export const VERCEL_PROJECT_SETTINGS_NODE_VERSION: string;
	export const VTE_VERSION: string;
	export const VERCEL_GIT_REPO_SLUG: string;
	export const INIT_CWD: string;
	export const EDITOR: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_STRIPE_KEY: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		DB_CONNECTION: string;
		DB_HOST: string;
		DB_PORT: string;
		DB_DATABASE: string;
		DB_USERNAME: string;
		DB_PASSWORD: string;
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
		FACEBOOK_CLIENT_ID: string;
		FACEBOOK_CLIENT_SECRET: string;
		DATABASE_URL: string;
		BUCKET_URL: string;
		BUCKET_NAME: string;
		BUCKET_KEY_FILE: string;
		SEGMIND_ESRGAN_URL: string;
		SEGMIND_KEY: string;
		OPENAI_API_KEY: string;
		REPLICATE_API_TOKEN: string;
		SECRET_STRIPE_KEY: string;
		DOMAIN: string;
		GJS_DEBUG_TOPICS: string;
		NOW_BUILDER: string;
		CONDA_PROMPT_MODIFIER: string;
		VERCEL_GIT_REPO_OWNER: string;
		LANGUAGE: string;
		USER: string;
		npm_config_user_agent: string;
		XDG_SEAT: string;
		TURBO_RUN_SUMMARY: string;
		XDG_SESSION_TYPE: string;
		GIT_ASKPASS: string;
		npm_node_execpath: string;
		SHLVL: string;
		npm_config_noproxy: string;
		HOME: string;
		CHROME_DESKTOP: string;
		OLDPWD: string;
		LESS: string;
		CONDA_SHLVL: string;
		DESKTOP_SESSION: string;
		NVM_BIN: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_json: string;
		GIO_LAUNCHED_DESKTOP_FILE: string;
		ZSH: string;
		LSCOLORS: string;
		NVM_INC: string;
		VERCEL_ENV: string;
		GTK_MODULES: string;
		XDG_SEAT_PATH: string;
		PAGER: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		CINNAMON_VERSION: string;
		npm_config_engine_strict: string;
		npm_config_resolution_mode: string;
		GIO_LAUNCHED_DESKTOP_FILE_PID: string;
		COLORTERM: string;
		_CE_M: string;
		VERCEL_GIT_COMMIT_SHA: string;
		VERCEL_GIT_PULL_REQUEST_ID: string;
		COLOR: string;
		INSIDE_NEMO_PYTHON: string;
		NVM_DIR: string;
		VERCEL_GIT_COMMIT_REF: string;
		npm_config_metrics_registry: string;
		MANDATORY_PATH: string;
		QT_QPA_PLATFORMTHEME: string;
		LOGNAME: string;
		VERCEL_GIT_PROVIDER: string;
		_: string;
		npm_config_prefix: string;
		XDG_SESSION_CLASS: string;
		DEFAULTS_PATH: string;
		USER_ZDOTDIR: string;
		XDG_SESSION_ID: string;
		TERM: string;
		VERCEL_URL: string;
		npm_config_cache: string;
		GNOME_DESKTOP_SESSION_ID: string;
		_CE_CONDA: string;
		VERCEL_GIT_COMMIT_AUTHOR_NAME: string;
		VERCEL_GIT_REPO_ID: string;
		npm_config_node_gyp: string;
		PATH: string;
		GDM_LANG: string;
		GTK3_MODULES: string;
		SESSION_MANAGER: string;
		TURBO_REMOTE_ONLY: string;
		NODE: string;
		npm_package_name: string;
		XDG_SESSION_PATH: string;
		XDG_RUNTIME_DIR: string;
		GDK_BACKEND: string;
		GNOME_TERMINAL_SCREEN: string;
		DISPLAY: string;
		LANG: string;
		XDG_CURRENT_DESKTOP: string;
		VSCODE_INJECTION: string;
		XDG_SESSION_DESKTOP: string;
		XAUTHORITY: string;
		GNOME_TERMINAL_SERVICE: string;
		LS_COLORS: string;
		TERM_PROGRAM: string;
		VSCODE_GIT_IPC_HANDLE: string;
		__VERCEL_BUILD_RUNNING: string;
		npm_lifecycle_script: string;
		XDG_GREETER_DATA_DIR: string;
		SSH_AUTH_SOCK: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		CONDA_PYTHON_EXE: string;
		SHELL: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		QT_ACCESSIBILITY: string;
		GDMSESSION: string;
		NO_AT_BRIDGE: string;
		CONDA_DEFAULT_ENV: string;
		VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string;
		GPG_AGENT_INFO: string;
		GJS_DEBUG_OUTPUT: string;
		VERCEL: string;
		XDG_VTNR: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		npm_execpath: string;
		XDG_CONFIG_DIRS: string;
		XDG_DATA_DIRS: string;
		NVM_CD_FLAGS: string;
		CONDA_EXE: string;
		ZDOTDIR: string;
		NX_DAEMON: string;
		npm_config_global_prefix: string;
		npm_command: string;
		CONDA_PREFIX: string;
		VERCEL_GIT_COMMIT_MESSAGE: string;
		VERCEL_GIT_PREVIOUS_SHA: string;
		VERCEL_PROJECT_SETTINGS_NODE_VERSION: string;
		VTE_VERSION: string;
		VERCEL_GIT_REPO_SLUG: string;
		INIT_CWD: string;
		EDITOR: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_STRIPE_KEY: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
