interface PokemonResult {
    name: string;
    url: string;
  }
  
  interface PokemonResponse {
    count: number;
    results: PokemonResult[];
  }

  export default PokemonResponse;