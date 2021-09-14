import {deleteCookie, getCookie, setCookie} from './cookie';

const TOKEN_AUTH_PREFIX = 'Bearer ';
const TOKEN_AUTH_COOKIE = 'token';
const TOKEN_REFRESH_COOKIE = 'tokenRefresh';

export function setTokenAuthCookie(value: string) {
    setCookie(TOKEN_AUTH_COOKIE, value.replace(TOKEN_AUTH_PREFIX, ''), {
        expires: 20 * 60 * 1000,
        Path: '/'
    });
}

export function setTokenRefreshCookie(value: string) {
    setCookie(TOKEN_REFRESH_COOKIE, value, {
        expires: 365 * 24 * 60 * 60 * 1000,
        Path: '/'
    });
}

export function getTokenAuth(): string | undefined {
    const value = getCookie(TOKEN_AUTH_COOKIE);
    return value != null ? TOKEN_AUTH_PREFIX + value : value;
}

export function getTokenRefresh(): string | undefined {
    return getCookie(TOKEN_REFRESH_COOKIE);
}

export function deleteTokenCookies() {
    deleteCookie(TOKEN_AUTH_COOKIE);
    deleteCookie(TOKEN_REFRESH_COOKIE);
}