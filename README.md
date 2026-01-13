# RSR Technologies Interview Application

An interactive interview application for Junior Data Scientist positions at RSR Technologies.

## Features

- **Two Interview Modes:**
  - Practice Mode: Learn with hints and detailed explanations
  - Mock Interview Mode: Realistic simulation with strict evaluation

- **7 Question Categories:**
  - Aptitude & Logic
  - Python & Programming
  - Statistics & Probability
  - Machine Learning
  - Deep Learning
  - SQL & Databases
  - Behavioral / HR Questions

- **Smart Evaluation System:**
  - Real-time answer analysis
  - Scores from 1-5 for each question
  - Detailed feedback after each answer

- **Comprehensive Final Report:**
  - Overall score percentage
  - Category-wise performance breakdown
  - Strengths and improvement areas
  - Hiring recommendation

## Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd rsr-interview-app

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

## Building for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure
```
rsr-interview-app/
├── src/
│   ├── components/       # React components
│   ├── data/            # Question bank and categories
│   ├── utils/           # Helper functions
│   └── styles/          # CSS modules (optional)
├── public/              # Static files
└── package.json         # Dependencies
```

## Usage

1. Launch the application
2. Select your interview mode (Practice or Mock)
3. Answer questions one by one
4. Receive immediate feedback
5. View your final assessment and recommendations

## Customization

To add or modify questions, edit the `src/data/questionBank.js` file.

To adjust scoring thresholds, modify `src/utils/constants.js`.

## Technologies Used

- React 18.2
- Lucide React (Icons)
- Tailwind CSS (Styling)

## License

MIT License

## Contact

For questions or support, contact: your-email@example.com