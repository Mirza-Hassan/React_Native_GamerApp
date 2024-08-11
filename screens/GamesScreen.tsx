import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchGames } from '../store/gamesSlice';
import { RootState, AppDispatch } from '../store/store';
import { addFavourite, removeFavourite } from '../store/favouritesSlice';
import { GameItem,  GamesScreenProps } from './type';

const GamesScreen: React.FC<GamesScreenProps> = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();
  const games = useSelector((state: RootState) => state.games.games) as GameItem[];
  const favourites = useSelector((state: RootState) => state.favourites) as GameItem[];
  const status = useSelector((state: RootState) => state.games.status);
  const error = useSelector((state: RootState) => state.games.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGames());
    }
  }, [dispatch, status]);

  const isFavourite = (game: GameItem) => favourites.find((fav) => fav.id === game.id);

  const handleFavourite = (game: GameItem) => {
    if (isFavourite(game)) {
      dispatch(removeFavourite(game));
    } else {
      dispatch(addFavourite(game));
    }
  };
  
  const renderItem = ({ item }: { item: GameItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.iconURL }} style={styles.icon} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>Rating: {item.rating}/5</Text>
        <Button
          title="Details"
          onPress={() => navigation.navigate('GameDetailsScreen', { game: item })}
        />
        <TouchableOpacity onPress={() => handleFavourite(item)} style={styles.favouriteButton}>
          <Text style={styles.favouriteText}>
            {isFavourite(item) ? 'Remove from Favourites' : 'Add to Favourites'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading games...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    color: '#777',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  favouriteButton: {
    marginTop: 10,
  },
  favouriteText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#777',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default GamesScreen;
