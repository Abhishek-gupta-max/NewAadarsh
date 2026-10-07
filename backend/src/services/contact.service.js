/**
 * contact.service.js — Business logic for contact form messages.
 *
 * NOTE: Part of the new architecture layer.
 * Existing route in app/api/contact/route.js is NOT changed.
 */

import contactRepository from '../repositories/contact.repository.js';

export const contactService = {
  /** Save a new contact message. */
  sendMessage: ({ name, email, phone, subject, message }) =>
    contactRepository.create({ name, email, phone, subject, message }),

  /** Retrieve all contact messages (admin). */
  getAll: () => contactRepository.findAll(),

  /** Get single message by id. */
  getById: async (id) => {
    const msg = await contactRepository.findById(id);
    if (!msg) throw Object.assign(new Error('Message not found'), { statusCode: 404 });
    return msg;
  },
};

export default contactService;
