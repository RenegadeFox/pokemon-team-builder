# Pokémon Team Builder

A React application that allows users to build their own Pokémon team using data fetched from the PokéAPI.

## Features

- Browse a list of Pokémon fetched from the PokéAPI.
- Add Pokémon to your team.
- Remove Pokémon from your team.
- Filter Pokémon by name.
- Responsive design using Bootstrap.

## Demo

![Screenshot of the Pokémon Team Builder](path/to/screenshot.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/pokemon-team-builder.git
   cd pokemon-team-builder
   ```

````

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Project Structure

```
pokemon-team-builder/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Filter.jsx
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonList.jsx
│   │   └── PokemonTeam.jsx
│   ├── services/
│   │   └── api.js
│   ├── views/
│   │   └── HomePage.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── index.html
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Components

### `App.jsx`

The main application component that sets up the layout and includes the `HomePage` component.

### `HomePage.jsx`

The main page component that includes the Pokémon list and the user's team. Manages the state for the user's team and the list of Pokémon.

### `PokemonList.jsx`

Fetches and displays the list of Pokémon. Contains a filter input to search for Pokémon by name.

### `PokemonCard.jsx`

Displays a single Pokémon card with an image, name, and an action button to add or remove the Pokémon from the team.

### `PokemonTeam.jsx`

Displays the user's selected Pokémon team using `PokemonCard` components.

### `Filter.jsx`

Contains the search bar to filter Pokémon.

### `api.js`

Contains functions to fetch data from the PokéAPI using axios.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Bootstrap](https://getbootstrap.com/) - The most popular CSS Framework for developing responsive and mobile-first websites
- [React Bootstrap](https://react-bootstrap.github.io/) - Bootstrap components built with React
- [PokéAPI](https://pokeapi.co/) - The RESTful Pokémon API

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the Pokémon series.
- Thanks to the developers of the PokéAPI.
````
