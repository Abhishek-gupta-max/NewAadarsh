// JSON response helpers shared by all API routes.

export function json(data, status = 200) {
  return Response.json(data, { status });
}

/**
 * Error response. `error` is kept alongside `message` because the existing
 * frontend reads `err.response.data.error` to show the message to the user.
 */
export function fail(status, message) {
  return Response.json({ success: false, message, error: message }, { status });
}

export function serverError(context, err, message = 'Something went wrong. Please try again.') {
  console.error(`[${context}]`, err);
  return fail(500, message);
}

/** Read a request body sent either as JSON or as form data. */
export async function readBody(request) {
  const contentType = request.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      return (await request.json()) || {};
    }
    if (contentType.includes('form')) {
      return Object.fromEntries(await request.formData());
    }
    const text = await request.text();
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

/** String value of a field, '' when missing. */
export function str(value) {
  if (value === undefined || value === null) return '';
  return String(value);
}

/** Integer parsing, 0 on failure. */
export function intval(value) {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? 0 : n;
}

/** 405 handler for methods an endpoint doesn't support. */
export function methodNotAllowed() {
  return fail(405, 'Method not allowed');
}
