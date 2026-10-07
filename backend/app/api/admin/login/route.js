import { checkCredentials, generateToken } from '../../../../lib/auth';
import { fail, json, readBody, serverError, str, methodNotAllowed } from '../../../../utils/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/login
 * Body: { username, password } → { success, token, username, message }
 */
export async function POST(request) {
  const body = await readBody(request);
  const username = str(body.username);
  const password = str(body.password);

  if (!username || !password) {
    return fail(400, 'Username and password are required!');
  }

  try {
    if (!checkCredentials(username, password)) {
      return fail(401, 'Invalid username or password!');
    }

    return json({
      success: true,
      token: generateToken(username),
      username,
      message: 'Logged in successfully!',
    });
  } catch (err) {
    return serverError('admin/login', err, 'Unable to log in right now.');
  }
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
