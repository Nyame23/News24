import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, useColorScheme, SafeAreaView } from 'react-native';
import axios from 'axios';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const API_KEY = 'f7e9b7f9814442818c4163a2891df713'; // Replace with your NewsAPI key
const CATEGORIES: string[] = ['General', 'Sports', 'Entertainment', 'Business', 'Technology'];

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string; // Add image URL field
}

const News: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [loading, setLoading] = useState<boolean>(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const fetchNews = async (category: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          category,
          apiKey: API_KEY,
          country: 'us', // Adjust the country as needed
        },
      });
      setNewsData(response.data.articles);
    } catch (error) {
      console.error('Error fetching news data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = ({ item }: { item: string }) => {
    const isSelected = item.toLowerCase() === selectedCategory.toLowerCase();
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          { 
            backgroundColor: isSelected ? 'blue' : colorScheme === 'dark' ? '#333' : '#ddd' 
          },
        ]}
        onPress={() => setSelectedCategory(item)}
      >
        <Text style={[styles.categoryText, { color: isSelected ? '#fff' : colorScheme === 'dark' ? '#fff' : '#000' }]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderNewsItem = ({ item }: { item: NewsArticle }) => (
    <View style={[styles.newsItem, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff' }]}>
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
      )}
      <View style={styles.newsContent}>
        <Text style={[styles.newsTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
          {item.title}
        </Text>
        <Text style={[styles.newsDescription, { color: colorScheme === 'dark' ? '#aaa' : '#555' }]}>
          {item.description}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="thumbs-up" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
          <Text style={[styles.actionText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="thumbs-down" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
          <Text style={[styles.actionText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="comment" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
          <Text style={[styles.actionText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="share" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
          <Text style={[styles.actionText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <View style={styles.channelHeader}>
        <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
          News
          <Text style={styles.highlight}> 24</Text>
        </Text>
      </View>
      
      <View style={styles.categoryContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <View style={styles.newsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={newsData}
            renderItem={renderNewsItem}
            keyExtractor={(item) => item.url}
            contentContainerStyle={styles.newsList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60, // Added padding to ensure header doesn't overlap with content
  },
  channelHeader: {
    position: 'absolute',
    top: 32,
    left: 16,
    zIndex: 1, // Ensure it stays above other content
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  highlight: {
    color: '#FFD700', // Adjust highlight color
  },
  categoryContainer: {
    marginTop: 6, // Space for header
    paddingVertical: 20,
  },
  categoryList: {
    paddingHorizontal: 8,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsContainer: {
    flex: 1,
  },
  newsList: {
    flexGrow: 1,
  },
  newsItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  newsContent: {
    marginTop: 10,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  newsDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 8,
  },
});

export default News;
