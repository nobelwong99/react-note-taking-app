import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useState<T>(() => {
		const jsonValue = localStorage.getItem(key);
		// Check if there are values in local storage
		if (jsonValue == null) {
			if (typeof initialValue === "function") {
				// Need to cast initialValue as function that will return a type T
				return (initialValue as () => T)();
			} else {
				return initialValue;
			}
		} else {
			return JSON.parse(jsonValue);
		}
	});

	// Save changes everytime value or key changes
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue] as [T, typeof setValue];
}
