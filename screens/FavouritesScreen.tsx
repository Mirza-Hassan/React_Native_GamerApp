import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  FlatList,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RootState} from '../store/store';
import {removeFavourite} from '../store/favouritesSlice';
import {GameItem, FavouritesScreenProps} from './type';

const FavouritesScreen: React.FC<FavouritesScreenProps> = ({navigation}) => {
  const favourites = useSelector(
    (state: RootState) => state.favourites,
  ) as GameItem[];
  const dispatch = useDispatch();

  const renderItem = ({item}: {item: GameItem}) => (
    <View style={styles.card}>
      <Image source={{uri: item.iconURL}} style={styles.icon} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>Rating: {item.rating}/5</Text>
        <Button
          title="Details"
          onPress={() => navigation.navigate('GameDetailsScreen', {game: item})}
        />
        <TouchableOpacity
          onPress={() => dispatch(removeFavourite(item))}
          style={styles.removeButton}>
          <Text style={styles.removeText}>Remove from Favourites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return favourites.length === 0 ? (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No favourite items</Text>
    </View>
  ) : (
    <FlatList
      data={favourites}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
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
    fontSize: 16,
    color: '#777',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  removeButton: {
    marginTop: 10,
  },
  removeText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
  },
});

export default FavouritesScreen;
