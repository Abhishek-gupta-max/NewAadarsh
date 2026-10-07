/**
 * contact.controller.js — HTTP controller for contact form endpoint.
 *
 * NOTE: Part of the new architecture layer.
 * Existing route in app/api/contact/route.js is NOT changed.
 */

import contactService from '../services/contact.service.js';
import { fail, json, readBody, str } from '../../utils/http.js';

export const contactController = {
  /** POST /api/contact */
  send: async (request) => {
    const body    = await readBody(request);
    const name    = str(body.name);
    const email   = str(body.email);
    const phone   = str(body.phone);
    const subject = str(body.subject);
    const message = str(body.message);

    if (!name || !email || !phone || !message) {
      return fail(400, 'All required fields must be provided!');
    }

    try {
      await contactService.sendMessage({ name, email, phone, subject, message });
      return json({ success: true, message: 'Message sent successfully! Our team will contact you soon.' });
    } catch (err) {
      console.error('[contact.controller:send]', err);
      return fail(500, 'Unable to send message. Please try again.');
    }
  },
};

export default contactController;
