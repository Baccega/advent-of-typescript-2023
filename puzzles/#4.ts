type Address = { address: string; city: string };
type PresentDeliveryList<T extends Record<string, unknown>> = {
	[names in keyof T]: Address;
};
