Instructions to update the project logo

1) Replace the existing logo file:

- Path: `public/images/logo12.png`
- Action: Overwrite `logo12.png` with the new PNG image you provided (keep the same filename).

2) If you prefer to keep the old file, copy the new image to `public/images/new_logo.png` and update references in the code (search for `logo12.png` and change to `new_logo.png`).

3) Verify in development:

```powershell
# from project root
npm run dev
# open http://localhost:5173 or the URL shown by Vite
```

4) Files to check:

- [index.html](index.html) — favicon reference
- [src/components/common/Navbar/Navbar.jsx](src/components/common/Navbar/Navbar.jsx) — header logo

Notes:
- I could not automatically write binary image data into the repo from this chat. Please paste or upload the PNG into the path above using your editor or file explorer.
- After replacing the file, the app will show the new logo without code changes because the site references `public/images/logo12.png` already.
