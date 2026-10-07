import { fail } from '../../../utils/http';

// Unknown /api/* URLs get a JSON 404 instead of an HTML page
const notFound = () => fail(404, 'API endpoint not found');

export const GET = notFound;
export const POST = notFound;
export const PUT = notFound;
export const DELETE = notFound;
