/**
 * App environment
 */
export class AppEnvironment {
    public static readonly APP_TITLE = import.meta.env.VITE_APP_TITLE;
    public static readonly APP_VERSION = import.meta.env.VITE_APP_VERSION;
    public static readonly APP_ENV = import.meta.env.VITE_APP_ENV;
}