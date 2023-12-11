type Good = `good_${string}`
type Bad = `naughty_${string}`

type RemoveNaughtyChildren<T extends Record<Good | Bad, unknown>> = Omit<T,Bad>;