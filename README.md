 <img width="1423" alt="Screenshot 2024-03-09 at 12 04 18" src="https://github.com/audiprevio/pokedex-next/assets/126348614/4cc4e034-8db6-456b-ba38-5c42a6bca3c1">

# Pokedext 
This is a simple Pokedex application built using Next.js, TypeScript, and Tailwind CSS. The app allows users to browse through a list of Pokemon, view details of individual Pokemon, and like/unlike their favorite Pokemon.  

## Features  
- Pokemon List Page: Displays a paginated list of Pokemon fetched from the PokeAPI. Each Pokemon in the list is clickable and redirects to the Pokemon Detail Page.
- Pokemon Detail Page: Shows detailed information about a specific Pokemon, including its name, ID, types, and stats. Users can like or unlike the Pokemon from this page.
- Liked Pokemon: Users can mark Pokemon as liked, and the app keeps track of the liked Pokemon using the Jotai state management library.  
- API Route Handlers: The app uses Next.js API route handlers to fetch data from the PokeAPI. This acts as a middleware to mask the backend API from the client-side.  
- React Query: The app leverages React Query for efficient client-side data fetching and caching.  
- Atomic Design: The components are organized following the principles of Atomic Design, promoting reusability and maintainability.  

## Technologies Used  
- Next.js  
- TypeScript  
- Tailwind CSS  
- Jotai (for state management) 
- React Query (for data fetching)  
- PokeAPI (for Pokemon data)  

## Getting Started  

1. Clone the repository:  
`bash  git clone https://github.com/your-username/pokedex-app.git  `

2.  Install the dependencies:

`pokedex-app  npm install   `

3.  Run the development server:
`npm run dev   `

4.  Open [http://localhost:3000](http://localhost:3000/) with your browser to see the app.

Project Structure
-----------------

*   `components/`: Contains reusable components used throughout the app.
    
    *   `AllPokemonList.tsx`: Displays the paginated list of Pokemon.
        
    *   `PokemonDetails.tsx`: Shows detailed information about a specific Pokemon.
        
    *   `LikedPokemonList.tsx`: Displays the list of liked Pokemon.
        
*   `pages/`: Contains the pages of the app.
    
    *   `index.tsx`: The home page that displays the Pokemon list.
        
    *   `pokemon/[id].tsx`: The dynamic page for individual Pokemon details.
        
    *   `liked-pokemon.tsx`: The page that displays the list of liked Pokemon.
        
*   `atoms/`: Contains the Jotai atoms used for state management.
    
    *   `likedPokemonAtom.ts`: Manages the state of liked Pokemon. Uses atomswithstorage to easily record liked pokemon in local storage
        
*   `interfaces/`: Contains TypeScript interfaces used in the app.
    
    *   `Pokemon.ts`: Defines the structure of a Pokemon object.
        
    *   `PokemonListResponse.ts`: Defines the structure of the response from the PokeAPI for a list of Pokemon.
        
*  `api/`: Contains the Next.js API route handlers.
    
    *  `pokemon/[id].ts`: Fetches data for a specific Pokemon from the PokeAPI.

Deeper Technical Breakdown
----------

Let's dive deeper into the core files and their logic:

1. `AllPokemonList.tsx`:
   - This component is responsible for displaying the paginated list of Pokemon.
   - It uses the `useQuery` hook from React Query to fetch the Pokemon data from the API endpoint `/api/pokemon`.
   - The `getPokemonList` function is an asynchronous function that fetches the Pokemon data from the PokeAPI based on the current page and limit.
   - The component renders a loading state while the data is being fetched and an error state if there's an error.
   - Once the data is fetched successfully, it renders a grid of Pokemon cards, displaying the Pokemon's image, name, ID, and types.
   - Each Pokemon card is clickable and navigates to the Pokemon Detail page using the `Link` component from Next.js.
   - The component also includes pagination buttons to navigate between pages.

2. `PokemonDetails.tsx`:
   - This component displays detailed information about a specific Pokemon.
   - It receives the `pokemon` object as a prop, which contains the data of the selected Pokemon.
   - It uses the `useAtom` hook from Jotai to manage the state of liked Pokemon.
   - The component renders the Pokemon's image, name, ID, types, and stats.
   - It includes a "Like" button that allows users to like or unlike the Pokemon. The liked state is toggled using the `toggleLike` function.
   - The component also provides a "Back" button to navigate back to the Pokemon List page.

3. `LikedPokemonList.tsx`:
   - This component displays the list of liked Pokemon.
   - It uses the `useAtom` hook to access the `likedPokemonAtom`, which holds the IDs of the liked Pokemon.
   - It then uses the `useQueries` hook from React Query to fetch the details of each liked Pokemon by making requests to the `/api/pokemon/[id]` endpoint.
   - The component renders a loading state while the data is being fetched and an error state if there's an error.
   - Once the data is fetched successfully, it renders a grid of liked Pokemon cards, similar to the `AllPokemonList` component.
   - Each liked Pokemon card is clickable and navigates to the Pokemon Detail page.

4. `likedPokemonAtom.ts`:
   - This file defines the Jotai atom `likedPokemonAtom`, which holds the state of liked Pokemon.
   - The atom is initialized with an empty array `[]`.
   - The atom can be accessed and modified using the `useAtom` hook in components that need to interact with the liked Pokemon state.

5. `api/pokemon/[id].ts`:
   - This is a Next.js API route handler that fetches data for a specific Pokemon from the PokeAPI.
   - It receives the Pokemon ID as a query parameter `[id]`.
   - Inside the handler, it constructs the URL for fetching the Pokemon data based on the provided ID.
   - It then makes a request to the PokeAPI using the `fetch` function and retrieves the Pokemon data.
   - If the request is successful, it returns the Pokemon data as the API response.
   - If there's an error during the request, it returns an appropriate error response.

These core files work together to create the functionality of the Pokedex app. The `AllPokemonList` component displays the list of Pokemon, the `PokemonDetails` component shows the details of a selected Pokemon and allows liking/unliking, the `LikedPokemonList` component displays the liked Pokemon, and the `likedPokemonAtom` manages the state of liked Pokemon. The API route handler `api/pokemon/[id].ts` acts as a middleware to fetch Pokemon data from the PokeAPI.
        

Deployment
----------

The app can be easily deployed to Vercel, a platform for static and server-rendered applications. To deploy, you can connect your GitHub repository to Vercel and configure the deployment settings.

Contributing
------------

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

License
-------

This project is licensed under the MIT License.

Copy code  Feel free to customize the README further based on your specific implementation details and add any additional sections or information you think would be helpful for others to understand and use your Pokedex app.
