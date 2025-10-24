# Boggle Game - Developer Documentation

## Introduction

This is a Boggle game implemented using Next.js, allowing players to form words from adjacent letters on a grid in a timed setting. The game offers multi-language support and dynamic configuration options such as grid size and play time.

## Getting Started

### Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

### Running the Development Server

To start the development server, use:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app in the browser.

### Building for Production

To create a production build, run:

```bash
npm run build
```

### Starting the Dev Server

To start dev server, use:

```bash
npm run dev
```

## Directory Structure

The project is structured as follows:

```
boggle-main
├── src
│   ├── app
│   ├── components
│   ├── containers
│   ├── contexts
│   ├── layouts
│   ├── lib
│   ├── screens
│   ├── server
│   ├── types
│   └── utils
├── public
├── components.json
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

### Key Files and Directories

- **src/app**: Contains main application routes and pages.
- **src/components**: UI components used throughout the app.
- **src/containers**: Container components handling complex logic and state management.
- **src/contexts**: React context implementations for global state management.
  - `game-controller-context.tsx`: Manages game configurations and player states.
  - `boogle-grid-context.tsx`: Handles the logic for the Boggle grid.
- **src/layouts**: Defines page layouts.
- **src/lib**: Contains utility functions.
- **src/server**: Server-side logic for word validation.
- **src/types**: TypeScript type definitions.
- **src/utils**: Utility data or constants.
- **public**: Static assets.

## Application Flow

1. **Configuration Screen (RootScreen)**

   - Users choose game configurations: number of players, language, time per round, and grid size.
   - Configurations are managed by the `GameConfiguration` component.
   - Players can add or remove participants and adjust the timer and grid settings.

   <img width="1706" height="942" alt="Screenshot 2025-10-24 at 07 50 49" src="https://github.com/user-attachments/assets/16403961-8bf5-48a8-b528-2eec27ae94bc" />


2. **Play Screen (PlayScreen)**

   - Displays the Boggle grid and a timer.
   - Players trace letters to form words.
   - Uses `BoogleGrid` and `Timer` components for gameplay mechanics.

    <img width="1710" height="1026" alt="Screenshot 2025-10-24 at 07 51 00" src="https://github.com/user-attachments/assets/93f93fbd-6253-4704-b854-a6d1c0a4604c" />

3. **Results Screen (ResultsScreen)**

   - Summarizes players' scores and words formed.
   - Players can restart the game using the "Play Again" button.

    <img width="1709" height="1025" alt="Screenshot 2025-10-24 at 07 51 10" src="https://github.com/user-attachments/assets/da44869f-dbf1-4c25-a1ff-abbb02dd796a" />


## Contexts and State Management

- **GameControllerContext**:

  - Handles player management, game state, and configurations.
  - Actions include adding/removing players, starting/ending games, and handling grid and time settings.

- **BoogleGridContext**:
  - Manages the Boggle grid, capturing user interactions, and tracing word paths.

## Word Validation

- The `word-api.ts` file contains logic to validate words against a predefined list.

## Theme and Styling

- The app uses Tailwind CSS for styling.
- The `globals.css` file contains global styles and theme configurations.
- The `ThemeProvider` provides dark/light theme toggling capability.

## Conclusion

This documentation provides an overview of the Boggle game app. For further details, refer to the code within each module and directory, and explore modifying or extending the functionality as needed.

## References

1. Boggle - https://en.wikipedia.org/wiki/Boggle#Rules
2. Mouse Events - https://www.w3schools.com/jsref/obj_mouseevent.asp
3. Array Generation - https://stackoverflow.com/questions/39924644/es6-generate-an-array-of-numbers
4. Design System - https://ui.shadcn.com/
5. Lucide Icons - https://lucide.dev/icons/
6. ChatGPT - Contents of this Readme are written using AI. Only the contents of the readme, i am not vibe coder duh.

Happy coding!
