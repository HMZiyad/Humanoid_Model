# Humanoid Agent

Welcome to the **Humanoid Agent** project! This is a cutting-edge web application that features a 3D avatar capable of real-time lip-syncing. Built with modern web technologies, it allows users to type text and watch the avatar speak it back with natural facial animations and punctuation-aware pausing.

## Features

- **3D Avatar Rendering**: High-quality 3D humanoid model rendered using `Three.js` and `@react-three/fiber`.
- **Real-Time Lip Sync**: The avatar's mouth moves in synchronization with the text-to-speech audio, mapping specific phonemes to visual "visemes".
- **Natural Punctuation**: The lip-sync engine intelligently pauses for commas, periods, and questions, creating a lifeline conversational rhythm.
- **Interactive UI**: Clean, futuristic overlay for user input and controls.
- **Responsive Design**: Fully responsive layout that looks great on any screen size.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **3D Engine**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: TypeScript

## Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/HMZiyad/Humanoid-Model.git
    cd Humanoid-Model
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:3000` to see the application in action.

## Usage

1.  Enter text into the input box at the bottom of the screen.
2.  Click the **Send** button (or press Enter).
3.  The text-to-speech engine will read your text, and the avatar will animate its lips in sync!
4.  You can rotate and zoom the camera using your mouse or touch gestures.

## Project Structure

- `app/`: Main Next.js application routes and layouts.
- `components/`: Reusable React components (`Scene`, `Avatar`, etc.).
- `hooks/`: Custom hooks, including the core `useLipSync` logic.
- `public/`: Static assets like the 3D model (`avatar.glb`).
- `download_model.js`: Helper script for model management.

## Troubleshooting

-   **Model Not Loading**: Ensure `avatar.glb` is present in the `public/` folder.
-   **No Audio**: Browsers require user interaction before playing audio. Make sure to click the "Send" button to trigger speech.
-   **Hydration Errors**: If you see hydration warnings in the console, they are usually harmless and suppressed in production.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
