# GlobalTNA — Mini Service Request Board

A full-stack web app where homeowners can post service requests and tradespeople can browse, filter, and manage them.

## Tech Stack
- **Frontend**: Next.js 16 (App Router)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **ODM**: Mongoose

## Project Structure
globaltna-assessment/
├── backend/    # Express REST API
└── frontend/   # Next.js app

## Environment Variables

### Backend (`backend/.env`)
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/globaltna?retryWrites=true&w=majority

### Frontend (`frontend/.env.local`)
NEXT_PUBLIC_API_URL=http://localhost:4000/api

## Setup Instructions

### 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/globaltna-assessment.git
cd globaltna-assessment

### 2. Backend setup
cd backend
npm install
npm run dev

### 3. Frontend setup
cd frontend
npm install
npm run dev

### 4. Seed sample data
cd backend
npm run seed

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | List all jobs |
| GET | /api/jobs/:id | Get single job |
| POST | /api/jobs | Create new job |
| PATCH | /api/jobs/:id | Update job status |
| DELETE | /api/jobs/:id | Delete job |

## Live URLs
- **Frontend**: https://globaltna-assessment.vercel.app
- **Backend**: https://globaltna-assessment.onrender.com