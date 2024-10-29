import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import resorces from '../components/resources.json';
import * as Linking from 'expo-linking';

const Textbook = () => {

    const textbook = resorces.textbooks;
    const renderTextbookItem = ({ item }) => (
        <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.itemContainer}>
            <Image source = {{uri: item.thumbnailUrl}} style = {styles.thumbnail} />
            <View style = {styles.textContainer}>
                <Text style = {styles.title}>{item.title}</Text>
                <Text style = {styles.author}> By: {item.author}</Text>
            </View>
        </TouchableOpacity>
    );
  return (
    <View style = {styles.container}>
        {articles.length > 0 ? (
            <FlatList
                data = {textbook}
                renderItem={renderTextbookItem}
                keyExtractor={(item) => item.id}
            />
        ) : (
            <Text style = {styles.noContent}>No textbooks available</Text>
        )}
    </View>
  )
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#121212',
            padding: 10,
        },
          itemContainer: {
            flexDirection: 'row',
            marginBottom: 15,
            backgroundColor: '#1E1E1E',
            padding: 10,
            borderRadius: 8,
        },
          thumbnail: {
            width: 50,
            height: 50,
            marginRight: 10,
            borderRadius: 5,
        },
          textContainer: {
            flex: 1,
        },
          title: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
          author: {
            color: '#cccccc',
            fontSize: 14,
        },
          source: {
            color: '#888888',
            fontSize: 12,
        },
          noContent: {
            color: '#888888',
            textAlign: 'center',
            marginTop: 20,
        },
})
export default Textbook