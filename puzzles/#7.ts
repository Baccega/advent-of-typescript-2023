type AppendGood<T extends Record<string, unknown>> = {
  [names in keyof T as `good_${string & names}`]: T[names];
};