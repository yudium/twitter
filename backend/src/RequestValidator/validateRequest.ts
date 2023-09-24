import express from "express";

type Error = Record<string, string[]>;

export function validateRequest(
  req: express.Request,
  schema: Record<string, any>
): {
  has_error: boolean;
  errors: Error;
} {
  const errors: Error = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = req.body[field];
    for (const rule of rules) {
      const error_message = rule(value);
      if (error_message) {
        errors[field] = errors[field] || [];
        errors[field].push(error_message);
      }
    }
  }

  return {
    has_error: Object.keys(errors).length > 0,
    errors,
  };
}
