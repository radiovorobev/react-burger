export const checkResponse = <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
};

export function getCookie(name: string) {
	const matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ?
		decodeURIComponent(matches[1]) : undefined;
}

export function getDate(str: string) {
	const currentDate = new Date();
	const date = new Date(str);
	const days = Math.round((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
	if (days === 0) {
		return `сегодня, ${date.toLocaleTimeString().slice(0, 5)} i-GMT+3`
	} else if (days === 1) {
		return `вчера, ${date.toLocaleTimeString().slice(0, 5)} i-GMT+3`
	} else if (days > 1 && days < 5) {
		return `${days} дня назад, ${date.toLocaleTimeString().slice(0, 5)} i-GMT+3`
	} else {
		return `${days} дней назад, ${date.toLocaleTimeString().slice(0, 5)} i-GMT+3`
	}
}