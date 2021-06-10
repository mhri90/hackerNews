import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import HttpStatus from 'http-status-codes';

import StoriesApi from '../../services/api/storiesApi';
import {API_URL} from '../../utils/constants';
import {useAppSelector, useAppDispatch} from '../../services/hooks';
import {selectTitle, setStory} from './storySlice';

const Home = () => {
  const storyTitle = useAppSelector(selectTitle);
  const dispatch = useAppDispatch();

  const [stories, setStories] = useState<IStory[]>();
  const [authors, setAuthors] = useState<IAuthor[]>();

  useEffect(() => {
    getTopStories();
  }, []);

  const getTopStories = async () => {
    const res = await StoriesApi.getTopStories();
    if (res.status === HttpStatus.OK) {
      const promises = res.data
        .slice(0, 10)
        .map((id: number) =>
          fetch(`${API_URL}/item/${id}.json`).then(response => response.json()),
        );
      const result: IStory[] = await Promise.all(promises);

      const sortedResults: IStory[] = result.sort((a, b) => {
        return a.score - b.score;
      });

      console.log('sortedResults', sortedResults);

      const authorPromises = result.map((story: IStory) =>
        fetch(`${API_URL}/user/${story.by}.json`).then(response =>
          response.json(),
        ),
      );
      const authors: IAuthor[] = await Promise.all(authorPromises);

      setAuthors(authors);

      setStories(sortedResults);
    } else Alert.alert('Error');
  };

  const renderStory = useCallback(
    ({item}: ListRenderItemInfo<IStory>) => {
      const date = new Date(item.time).toString();

      const author: IAuthor = authors?.find(e => e.id === item.by);

      return (
        <View style={styles.storyItem}>
          <Text>TITLE: {item.title}</Text>
          <Text>URL: {item.url}</Text>
          <Text>TIME: {date}</Text>
          <Text>SCORE: {item.score}</Text>
          <Text>AUTHOR ID: {author.id}</Text>
          <Text>AUTHOR KARMA SCORE: {author.karma}</Text>
          <Pressable
            onPress={() => {
              dispatch(setStory(item.title));
            }}
            style={styles.button}>
            <Text>Click here to show the title</Text>
          </Pressable>
        </View>
      );
    },
    [stories],
  );

  const renderEmptyComponent = useCallback(() => {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <FlatList
        style={styles.container}
        data={stories ?? []}
        renderItem={renderStory}
        keyExtractor={({url}) => `${url}`}
        ListEmptyComponent={renderEmptyComponent}
      />
      <View style={styles.titleContainer}>
        <Text>{storyTitle}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  storyItem: {
    marginBottom: 20,
  },
  container: {
    paddingHorizontal: 10,
    flex: 2,
  },
  titleContainer: {
    flex: 1,
    backgroundColor: '#0077',
    paddingTop: 20,
  },
  safearea: {
    flex: 1,
  },
  button: {
    backgroundColor: '#4554',
    paddingVertical: 5,
  },
});

export default Home;
