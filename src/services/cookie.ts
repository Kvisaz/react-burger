interface ICookieProps {
    expires?: number;

    [key: string]: any;
}

export function setCookie(name: string, value: string, props: ICookieProps = {}) {
    if (props.expires) {
        const d = new Date();
        d.setTime(d.getTime() + props.expires * 1000);
        props.expires = +d.toUTCString();
    }

    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}