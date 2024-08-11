import {StackNavigationProp} from '@react-navigation/stack';

export interface GameItem {
  id: number;
  title: string;
  rating: number;
  iconURL: string;
  description?: string;
}

export interface FavouritesScreenProps {
  navigation: StackNavigationProp<any, any>;
}

export interface GamesScreenProps {
  navigation: StackNavigationProp<any, any>; 
}

export interface GamesState {
  games: GameItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
