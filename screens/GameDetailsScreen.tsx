import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GameItem } from './type';

const GameDetailsScreen = () => {
  const route = useRoute();
  const { game } = route.params as { game: GameItem };

  return (
    <View style={styles.container}>
      <Image source={{ uri: game.iconURL }} style={styles.icon} />
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.rating}>{`Rating: ${game.rating}/5`}</Text>
      <Text style={styles.description}>{game.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#777',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default GameDetailsScreen;
