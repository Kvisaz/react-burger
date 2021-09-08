import { deleteCookie, getCookie, setCookie } from './cookie';

const TOKEN_COOKIE = 'token';
const TOKEN_REFRESH_COOKIE = 'tokenRefresh';

export function setTokenAuthCookie(value: string) {
	setCookie(TOKEN_COOKIE, value, {
		expires: 20 * 60 * 1000,
	});
}

export function setTokenRefreshCookie(value: string) {
	setCookie(TOKEN_REFRESH_COOKIE, value, {
		expires: 365 * 24 * 60 * 60 * 1000,
	});
}

export function getTokenAuth(): string | undefined {
	return getCookie(TOKEN_COOKIE);
}

export function getTokenRefresh(): string | undefined {
	return getCookie(TOKEN_REFRESH_COOKIE);
}

export function deleteTokenCookies() {
	deleteCookie(TOKEN_COOKIE);
	deleteCookie(TOKEN_REFRESH_COOKIE);
}