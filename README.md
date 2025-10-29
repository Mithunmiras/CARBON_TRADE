## Backend API (Express + MongoDB)

This project includes a lightweight Express server to securely connect to MongoDB and provide API routes for `readings` and `ledger`.

### Environment variables

Create a `.env` file in the project root:

```
# If using MongoDB Atlas, prefer the full URI
MONGODB_URI=mongodb+srv://thejeshharikumar2023_db_user:MongoDB@6969@<your-cluster-host>/hackathon?retryWrites=true&w=majority

# Fallback/manual pieces (used only if MONGODB_URI is not set)
DB_USERNAME=thejeshharikumar2023_db_user
DB_PASSWORD=MongoDB@6969
DB_HOST=localhost:27017
DB_NAME=hackathon

PORT=5000
```

Replace `<your-cluster-host>` with your MongoDB Atlas cluster hostname. Collections used: `readings`, `ledger`.

### Scripts

```
npm run server    # start Express API (PORT defaults to 5000)
npm run dev       # start Vite (frontend)
npm run dev:full  # run both server and Vite concurrently
```

### API endpoints

- GET `/api/readings` — list readings
- POST `/api/readings` — create reading
- GET `/api/ledger` — list ledger records
- POST `/api/ledger` — create ledger record

