type DecipherNaughtyList<T extends string> = T extends `${infer First}/${infer Second}`
	? First | DecipherNaughtyList<Second>
	: T;
