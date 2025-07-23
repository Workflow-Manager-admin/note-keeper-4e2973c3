# note-keeper-4e2973c3

## Notes Backend Setup

### Required Environment Variables

Make sure a `.env` file exists in `notes_backend` with the following variables set:

```
PORT=3000
HOST=0.0.0.0

# MySQL connection (to notes_database container)
MYSQL_HOST=<database-host>
MYSQL_PORT=5001
MYSQL_USER=<user>
MYSQL_PASSWORD=<password>
MYSQL_DATABASE=<database-name>

# Secret for JWT tokens
JWT_SECRET=<change-this-secret>
```

### Setup

1. Run `npm install` in `notes_backend/` to install dependencies if not already installed.
2. Start backend: `npm start` or for dev: `npm run dev`
3. The API docs will be at `/docs` when running.

### Endpoints

- `POST /api/auth/register` Register new user (`{username, email, password}`)
- `POST /api/auth/login` Login/get JWT (`{email, password}`)
- `GET /api/auth/profile` Get current user info (JWT auth required)
- `GET /api/notes` List or search notes (`?search=...`, JWT auth required)
- `POST /api/notes` Create note (`{title, content}`)
- `GET /api/notes/:id` Get note by id
- `PUT /api/notes/:id` Update note (`{title, content}`)
- `DELETE /api/notes/:id` Delete note

**All `/api/notes*` endpoints require an `Authorization: Bearer <token>` header.**
