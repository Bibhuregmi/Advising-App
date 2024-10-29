import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking } from 'react-native';
import React, {useState} from 'react';
import {Tab, TabView} from '@rneui/themed';     
import resourcesData from '../components/resources.json';
import { useNavigation } from '@react-navigation/native';

const Resources = () => {
    const [index, setIndex] = useState(0);
    
    const handleOpenLink = (url) => {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    }

    const renderResourceItem = ({item}) => (
        <TouchableOpacity style = {styles.itemContainer} onPress={() => handleOpenLink(item.link)}>
            {item.thumbnailUrl && <Image source= {{ uri : item.thumbnailUrl}} style= {styles.thumbnail}/>}
            <View>
                <Text style = {styles.title}>{item.title}</Text>
                <Text style = {styles.author}>{item.author}</Text>
                <Text style = {styles.source}>{item.source || "Source not available"}</Text>
            </View>
        </TouchableOpacity>
    )
    const renderTabContent = (data) => (
        data.length > 0 ? (
            <FlatList
                data = {data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderResourceItem}
            />
        ) : (
            <Text style = {styles.noResourcesText}>No resources available</Text>
        )
    );

  return (
    <View style = {styles.container}>
        <View style = {styles.tabContainer}>
      <Tab 
            value={index} 
            onChange={(e) => setIndex(e)} 
            indicatorStyle= {{backgroundColor: 'transparent'}}
        >
        <Tab.Item 
            title = "Articles" 
            titleStyle = {styles.tabTitle}
            containerStyle={[
                styles.tabItem,
                index === 0 && styles.activeTabItem, 
            ]}
        />
        <Tab.Item 
            title = "Textbook" 
            titleStyle = {styles.tabTitle}
            containerStyle={[
                styles.tabItem,
                index === 1 && styles.activeTabItem, 
            ]}
        />
        <Tab.Item 
            title = "Video" 
            titleStyle = {styles.tabTitle}
            containerStyle={[
                styles.tabItem,
                index === 2 && styles.activeTabItem, 
            ]}
        />
       
      </Tab>
      </View>

      <TabView value={index} onChange={setIndex} animationType='spring'>
        <TabView.Item style = {styles.tabView}>
            {renderTabContent(resourcesData.articles)}
        </TabView.Item>
        <TabView.Item style = {styles.tabView}>
            {renderTabContent(resourcesData.textbooks)}
        </TabView.Item>
        <TabView.Item style = {styles.tabView}>
            {renderTabContent(resourcesData.videos)}
        </TabView.Item>
      </TabView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    tabView: {
      flex: 1,
      padding: 10,
      backgroundColor: '#121212',
    },
    tabContainer:{
        marginTop: 50, 
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#121212',
    },
    tabItem: {
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#444444',
        paddingVertical: 8,
        marginHorizontal: 5,
    },
    activeTabItem: {
        borderColor: '#38b6ff', 
        backgroundColor: '#333333', 
    },
    tabTitle: {
        color: '#38b6ff',
        fontWeight: '600',
    },
    itemContainer: {
      flexDirection: 'row',
      padding: 12,
      marginVertical: 8,
      marginHorizontal: 8,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#38b6ff",
      backgroundColor: '#444444',
      borderRadius: 8,
      alignItems: 'center',
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      marginBottom: 4,
    },
    author: {
      fontSize: 14,
      color: '#ddd',
      fontWeight: '500',
    },
    source: {
      fontSize: 12,
      color: '#ccc',
    },
    noResourcesText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginTop: 20,
    },
  });
export default Resources