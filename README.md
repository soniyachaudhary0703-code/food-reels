# FoodReel — MERN + Tailwind
Component-based food reel project with separate User and Hotel Manager login.

## Real videos
Put real vertical MP4 food videos in `frontend/public/videos/`:
`noodles.mp4`, `pizza.mp4`, `burger.mp4`, `biryani.mp4`, `pasta.mp4`, `dessert.mp4`.

## Run
Backend:
`cd backend`
`npm install`
Copy `.env.example` to `.env` and add your MongoDB Atlas URI.
`node seed.js`
`node server.js`

Frontend (new terminal):
`cd frontend`
`npm install`
`npm run dev`

Demo:
User: user@foodreel.com / user123
Manager: manager@foodreel.com / manager123

## Interview explanation
React components -> Context -> Axios -> Express routes -> controllers/models -> MongoDB.
JWT protects APIs; manager middleware protects manager CRUD.
IntersectionObserver plays the visible reel and pauses other reels.
