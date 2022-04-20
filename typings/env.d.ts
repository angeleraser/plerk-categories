interface Dict<T> {
	[key: string]: T | undefined;
}

interface AppProcessEnv extends ProcessEnv, Dict<string> {
	VUE_APP_API_URL: string;
	NODE_ENV: 'local' | 'development' | 'testing' | 'production';
	VUE_APP_ACCESS_TOKEN: string;
}

declare namespace NodeJS {
	interface Process extends __WebpackModuleApi.NodeProcess {
		env: AppProcessEnv;
	}
}

declare const process: NodeJS.Process;
