import React, { useCallback, memo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme, ImageBackground, Image, ImageSourcePropType, ColorSchemeName } from 'react-native';
import { images } from '../../constants';

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

interface CategoryCardProps {
    item: NewsCategory;
    colorScheme: ColorSchemeName;
}

interface LatestNewsItemProps {
    item: LatestNewsItem;
    colorScheme: ColorSchemeName;
}

const newsCategories: NewsCategory[] = [
    { id: '1', title: 'General News', image: require('../../assets/images1/cards.png') },
    { id: '2', title: 'Sports', image: images.c1 },
    { id: '3', title: 'Technology', image: images.c3 },
    { id: '4', title: 'Entertainment', image: images.c4 },
];

const latestNews: LatestNewsItem[] = [
    { id: '1', title: 'Breaking News: Major Event Happening Now', image: images.monalisa },
    { id: '2', title: 'Sports Update: Game Results', image: images.c4 },
    { id: '3', title: 'Tech Review: New Gadget Released', image: images.c2 },
    { id: '4', title: 'Entertainment: Celebrity News', image: images.c1 },
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
        <ImageBackground source={item.image} style={styles.newsImage} imageStyle={styles.imageStyle}>
            <View style={styles.overlay}>
                <Text style={[styles.newsTitle, { color: colorScheme === 'dark' ? '#fff' : '#fff' }]}>{item.title}</Text>
            </View>  
        </ImageBackground>
    </View>
));

const HomePage = () => {
    const colorScheme = useColorScheme() || 'light'; // Provide default value

    const renderCategory = useCallback(({ item }: { item: NewsCategory }) => (
        <CategoryCard item={item} colorScheme={colorScheme} />
    ), [colorScheme]);

    const renderLatestNews = useCallback(({ item }: { item: LatestNewsItem }) => (
        <LatestNewsItem item={item} colorScheme={colorScheme} />
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
                data={[{ id: '1', type: 'categories' }, { id: '2', type: 'latestNews' }]}
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
                                    initialNumToRender={5}
                                    maxToRenderPerBatch={10}
                                    windowSize={21}
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
                                    initialNumToRender={5}
                                    maxToRenderPerBatch={10}
                                    windowSize={21}
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
        paddingTop: 15, // Adjusted for header space
    },
    channelHeader: {
        marginBottom: 24, // Existing margin to push content down
        marginTop: 16, // Adjust this value to move header down
        marginLeft: 16,
        left: -140, // Adjust this value to move header to the left
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    card: {
        borderRadius: 8,
        width: 150,
        height: 190,
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
        fontSize: 17,
        fontWeight: 'bold',
        padding: 8,
        borderRadius: 4,
    },
    imageStyle: {
        borderRadius: 8,
    },
    newsItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        width: 150,
        height: 190,
        marginHorizontal: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    newsImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8,
        borderRadius: 4,
    },
    categoryList: {
        marginBottom: 16,
    },
    newsList: {
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    highlight: {
        color: '#FFD700',
    },
});


export default HomePage;
