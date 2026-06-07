const router = require('express').Router();
const db = require('../db');

/**
 * POST /api/contact.php
 * Body: { name, email, phone, subject, message }
 * Mirrors contact.php
 */
router.post('/api/contact.php', async (req, res) => {
  try {
    const { name = '', email = '', phone = '', subject = '', message = '' } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    // Insert into contact_messages table if it exists
    try {
      const [tables] = await db.query("SHOW TABLES LIKE 'contact_messages'");
      if (tables.length > 0) {
        await db.query(
          'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
          [name, email, phone, subject, message]
        );
      }
    } catch (dbErr) {
      // Table may not exist — graceful no-op (same as PHP behaviour)
      console.warn('[contact] DB insert skipped:', dbErr.message);
    }

    return res.json({
      success: true,
      message: 'Message sent successfully! Our team will contact you soon.'
    });
  } catch (err) {
    console.error('[contact] Error:', err.message);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = router;
