FoodReel — Food Discovery and Ordering App
A MERN stack food application with vertical food reels, user and hotel manager accounts, and interactive food discovery features.
Demo: https://food-reels-ten.vercel.app/
GitHub: https://github.com/soniyachaudhary0703-code/food-reels
Features
- Explore food through vertical video reels
- Browse food categories and reel details
- User registration and login
- Separate user and hotel manager roles
- Like, comment, save, share, and mute reel interactions
- Add food items to the cart
- Manager dashboard for managing food reels
- JWT-based authentication and protected manager routes
- Responsive interface with smooth reel scrolling and playback
Technologies Used
Frontend: React, JavaScript, Tailwind CSS, React Router, Axios, Lucide React, React Hot Toast
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
Deployment: Vercel
Demo Login Details
User account
Email: user@foodreel.com
Password: user123
Hotel Manager account
Email: manager@foodreel.com
Password: manager123
Note: These demo accounts are created by running the backend seed script against your configured database. They may not be available on the live demo unless its backend and database have been seeded accordingly.
Installation and Setup
1. Clone the repository:
   git clone https://github.com/soniyachaudhary0703-code/food-reels.git
2. Open the project folder:
   cd food-reels
3. Set up the backend:
   cd backend
   npm install
4. Configure backend/.env with your MongoDB connection string and required environment variables.
5. Seed the database with demo users and sample reels:
   node seed.js
6. Start the backend:
   node server.js
7. Open a new terminal and start the frontend:
   cd frontend
   npm install
   npm run dev
8. Open the local URL shown in the frontend terminal.
Video files: Add the required vertical MP4 food videos to frontend/public/videos/ using the filenames referenced by the seed data (for example, noodles.mp4, pizza.mp4, burger.mp4, biryani.mp4, pasta.mp4, and dessert.mp4).
How It Works
React components manage the interface, Context manages shared authentication and cart state, Axios sends API requests to Express, and Mongoose connects the backend to MongoDB. JWT authentication protects APIs, while manager middleware restricts manager-only actions.
Developer
Soniya Chaudhary
GitHub: https://github.com/soniyachaudhary0703-code
Portfolio: https://portfolio-gamma-beryl-66.vercel.app/
