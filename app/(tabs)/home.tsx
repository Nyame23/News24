import React, { useCallback, memo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Image, ImageSourcePropType, Dimensions } from 'react-native';
import { images } from '../../constants';
import { useTheme } from '../context/ThemeContext';
import { Linking } from 'react-native';

interface NewsCategory {
    id: string;
    title: string;
    image: ImageSourcePropType;
}

interface LatestNewsItem {
    id: string;
    title: string;
    image: ImageSourcePropType;
}

interface TopStoryItem {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
    link?: string; // Optional link for additional information
}

interface EditorPickItem {
    id: string;
    title: string;
    image: ImageSourcePropType;
}

interface CategoryCardProps {
    item: NewsCategory;
    colorScheme: 'light' | 'dark';
}

interface LatestNewsItemProps {
    item: LatestNewsItem;
    colorScheme: 'light' | 'dark';
}

interface TopStoryItemProps {
    item: TopStoryItem;
    colorScheme: 'light' | 'dark';
}

interface EditorPickItemProps {
    item: EditorPickItem;
    colorScheme: 'light' | 'dark';
}

const { width: screenWidth } = Dimensions.get('window');

const newsCategories: NewsCategory[] = [
    { id: '1', title: 'General News', image: images.gen },
    { id: '2', title: 'Sports', image: images.sport },
    { id: '3', title: 'Technology', image: images.tech1 },
    { id: '4', title: 'Entertainment', image: images.ent },
];

const latestNews: LatestNewsItem[] = [
    { id: '1', title: 'Breaking News: Major Event Happening Now', image: images.unv },
    { id: '2', title: 'Sports Update: Game Results', image: images.unv },
    { id: '3', title: 'Tech Review: New Gadget Released', image: images.unv },
    { id: '4', title: 'Entertainment: Celebrity News', image: images.unv },
];

const topStories: TopStoryItem[] = [
    { id: '1', title: 'OpenDot IT Services', description: 'Discover how OpenDot is revolutionizing IT services with cutting-edge solutions for businesses of all sizes. Learn more about their services and solutions.', image: images.opendot, link: 'https://opendotsolutions.com/' },
    { id: '2', title: 'OpenDot Solar Solutions', description: 'Explore the benefits of OpenDot Solar, a leading provider of solar energy solutions. Read about their innovative products and services for a sustainable future.', image: images.opendot, link: 'https://opendotsolutions.com/products/' },
];

const editorPicks: EditorPickItem[] = [
    { id: '1', title: '', image: images.bbc },
    { id: '2', title: '', image: images.ajz },
    { id: '3', title: '', image: images.cnn },
    { id: '4', title: '', image: images.tc },
    { id: '5', title: '', image: images.tg },
    { id: '6', title: '', image: images.espn },
    { id: '7', title: '', image: images.reuters },
];

const CategoryCard = memo(({ item, colorScheme }: CategoryCardProps) => (
    <TouchableOpacity style={styles.card}>
        <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.absoluteImage} />
            <View style={styles.overlay}>
                <Text style={[styles.cardTitle, { color: colorScheme === 'dark' ? '#fff' : '#fff' }]}>{item.title}</Text>
            </View>
        </View>
    </TouchableOpacity>
));

const LatestNewsItem = memo(({ item, colorScheme }: LatestNewsItemProps) => (
    <View style={styles.newsItem}>
        <ImageBackground 
            source={item.image} 
            style={styles.newsImage} 
            imageStyle={styles.imageStyle} 
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={[styles.newsTitle, { color: colorScheme === 'dark' ? '#fff' : '#fff' }]}>{item.title}</Text>
            </View>
        </ImageBackground>
    </View>
));

const TopStoryItem = memo(({ item, colorScheme }: TopStoryItemProps) => (
    <View style={styles.topStoryItem}>
        <Image source={item.image} style={styles.topStoryImage} resizeMode="contain" />
        <View style={styles.storyContent}>
            <Text style={[styles.storyTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{item.title}</Text>
            <Text style={[styles.storyDescription, { color: colorScheme === 'dark' ? '#ccc' : '#666' }]}>{item.description}</Text>
            {item.link ? (
                <TouchableOpacity onPress={() => item.link && Linking.openURL(item.link)}>
                    <Text style={[styles.linkText, { color: colorScheme === 'dark' ? '#0f9' : '#00f' }]}>Read more</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    </View>
));


const EditorPickItem = memo(({ item, colorScheme }: EditorPickItemProps) => (
    <View style={styles.editorPickItem}>
        <ImageBackground 
            source={item.image} 
            style={styles.editorPickImage} 
            imageStyle={styles.imageStyle} 
            resizeMode="cover"
        >
            <View>
                <Text style={[styles.editorPickTitle, { color: colorScheme === 'dark' ? '#fff' : '#fff' }]}>{item.title}</Text>
            </View>
        </ImageBackground>
    </View>
));

const HomePage = () => {
    const { darkMode } = useTheme();
    const colorScheme = darkMode ? 'dark' : 'light';

    const renderCategory = useCallback(({ item }: { item: NewsCategory }) => (
        <CategoryCard item={item} colorScheme={colorScheme} />
    ), [colorScheme]);

    const renderLatestNews = useCallback(({ item }: { item: LatestNewsItem }) => (
        <LatestNewsItem item={item} colorScheme={colorScheme} />
    ), [colorScheme]);

    const renderTopStory = useCallback(({ item }: { item: TopStoryItem }) => (
        <TopStoryItem item={item} colorScheme={colorScheme} />
    ), [colorScheme]);

    const renderEditorPick = useCallback(({ item }: { item: EditorPickItem }) => (
        <EditorPickItem item={item} colorScheme={colorScheme} />
    ), [colorScheme]);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
            <View style={styles.channelHeader}>
                <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
                    News
                    <Text style={styles.highlight}> 24</Text>
                </Text>
            </View>

            <FlatList
                data={[{ id: '1', type: 'categories' }, { id: '2', type: 'latestNews' }, { id: '3', type: 'topStories' }, { id: '4', type: 'editorPicks' }]}
                renderItem={({ item }) => {
                    if (item.type === 'categories') {
                        return (
                            <View>
                                <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>News Categories</Text>
                                <FlatList
                                    data={newsCategories}
                                    renderItem={renderCategory}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.categoryList}
                                />
                            </View>
                        );
                    } else if (item.type === 'latestNews') {
                        return (
                            <View>
                                <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Trending News</Text>
                                <FlatList
                                    data={latestNews}
                                    renderItem={renderLatestNews}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.newsList}
                                />
                            </View>
                        );
                    } else if (item.type === 'topStories') {
                        return (
                            <View>
                                <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Top Stories</Text>
                                <FlatList
                                    data={topStories}
                                    renderItem={renderTopStory}
                                    keyExtractor={(item) => item.id}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.topStoryList}
                                />
                            </View>
                        );
                    } else if (item.type === 'editorPicks') {
                        return (
                            <View>
                                <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Editors</Text>
                                <FlatList
                                    data={editorPicks}
                                    renderItem={renderEditorPick}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.editorPickList}
                                />
                            </View>
                        );
                    }
                    return null;
                }}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>No data available</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
    },
    channelHeader: {
        marginBottom: 16,
        alignItems: 'center',
        marginLeft: -250,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    card: {
        borderRadius: 8,
        width: screenWidth * 0.4,
        height: screenWidth * 0.5,
        marginHorizontal: 8,
        overflow: 'hidden',
    },
    imageContainer: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    absoluteImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'center',
    },
    imageStyle: {
        borderRadius: 8,
    },
    newsItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        width: screenWidth * 0.4,
        height: screenWidth * 0.5,
        marginHorizontal: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    newsImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'center',
    },
    categoryList: {
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    newsList: {
        paddingBottom: 16,
        paddingHorizontal: 8,
    },
    topStoryItem: {
        flexDirection: 'row',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    topStoryImage: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
    },
    storyContent: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
    },
    storyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    storyDescription: {
        fontSize: 14,
    },
    topStoryList: {
        paddingHorizontal: 8,
    },
    editorPickList: {
        // your desired styles here
    },
    editorPickItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        width: screenWidth * 0.4,
        height: screenWidth * 0.5,
        marginHorizontal: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    editorPickImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editorPickTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    highlight: {
        color: '#FFD700',
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
    },
});

export default HomePage;
