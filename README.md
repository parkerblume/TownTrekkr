# Town Trekkr

Welcome to Town Trekkr, a community-based game inspired by GeoGuessr. Town Trekkr allows users to explore and guess the locations of photos within your groups, or "Towns," enhancing the fun of geographical discovery while contributing to your community. This repo includes a web application component and backend services.

## Features

- **User Accounts**: Register and login to maintain personal game history and scores.
- **Town Management**: Users can join, leave, or create their own towns. Each town can have custom boundaries and descriptions to guide the gameplay.
- **Photo Contributions**: Members of towns can upload photos via our mobile app, contributing to the pool of images used in the game.
- **Geolocation Guessing**: Take a guess where the photo was taken and get feedback on how close your guess was with a built-in distance measure.

## Components

Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).
- **Web App**: Developed with React.js and styled using TailwindCSS. It features a robust set of functionalities including account management and town interactions.
- **Backend Services**: Built with Node.js and Express.js, the backend provides RESTful APIs for the web app to interact with the database.
- 
## Mobile App

Note: The mobile app component, built with Expo and React Native, is not included in this repository. If you would like to view the mobile app [Click Here.](https://github.com/parkerblume/TownTrekkr-mobile)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/parkerblume/TownTrekkr.git
   cd towntrekkr
   
   ```

2. Install dependencies for the application:
   ```bash
   yarn install-main
   ```

3. Create a `.env` file in the packages directory and add the necessary environment variables:
   ```
   MONGO_URI=<your_mongodb_uri>
   PUBLIC_URL=https://www.towntrekkr.com/
   ```

4. Start the backend server:
   ```bash
   yarn start
   ```

5. In a new terminal, start the web app:
   ```bash
   yarn web
   ```

## Authors
- Project Manager & Web Development — [Garrison Scarboro](https://github.com/gscarboro)
- Web Development — [Camilo Alvarez](https://github.com/Noway-code)
- API Lead Developer— [Ryan Latour](https://github.com/ryanglatour)
- API & Database — [Dylan Stone](https://github.com/StoneTD)
- Mobile Dev — [David Figueras-Sosa](https://github.com/DavidJFig)
- Mobile Dev & API — [Parker Blume](https://github.com/parkerblume)


## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or add new features.
