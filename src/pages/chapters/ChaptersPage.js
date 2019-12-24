import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import AppSizes from '../../app/app.sizes';
import AppStyles from '../../app/app.styles';
import ChapterListItem from '../../components/chapter/ChapterListItem';
import Icon from '../../components/common/Icon';
import styles from './chaptersPage.styles';
import AppColors from '../../app/app.colors';
import * as MangaActions from '../../redux/actions/manga-actions';

class ChaptersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  onFavoritePress = () => {
    const { markMangaAsFavorite, selectedManga } = this.props;
    markMangaAsFavorite(selectedManga.name, !selectedManga.isFavorite);
  }

  onNextPress = () => {
    const { page } = this.state;
    this.scroll.scrollTo({ x: (page + 1) * AppSizes.screen.width * 0.70 });
    this.setState({
      page: page + 1,
    }, () => this.flatList.scrollToOffset({ animated: true, offset: 0 }));
  };

  onPreviousPress = () => {
    const { page } = this.state;
    this.scroll.scrollTo({ x: (page - 1) * AppSizes.screen.width * 0.70 });
    this.setState({
      page: page - 1,
    }, () => this.flatList.scrollToOffset({ animated: true, offset: 0 }));
  };

  onScroll = (e) => {
    let offset = e.nativeEvent.contentOffset.x / (AppSizes.screen.width * 0.70);
    offset = parseFloat((offset * 100).toFixed(0)) / 100;
    if (Number.isInteger(offset)) {
      this.setState({
        page: offset,
      }, () => this.flatList.scrollToOffset({ animated: true, offset: 0 }));
    }
  };

  render() {
    const { chapters, loadingStatus, selectedManga } = this.props;
    const { page } = this.state;

    const numberOfPages = Math.ceil(chapters.length / 100);
    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      pages.push({
        indexMin: i * 100,
        indexMax: (i === numberOfPages - 1) ? chapters.length - 1 : i * 100 + 99,
      });
    }

    if (loadingStatus.loading) {
      return (
        <View style={AppStyles.loadingView}>
          <ActivityIndicator size="large" color={AppColors.palette.red} />
        </View>
      );
    }

    const chaptersWithEmpty = [...chapters].filter((chap, index) => index >= pages[page].indexMin && index <= pages[page].indexMax);
    const emptyChaptersToAdd = chaptersWithEmpty.length % 4;
    for (let i = 1; i <= emptyChaptersToAdd; i++) {
      chaptersWithEmpty.push({ id: `chapterNull_${i}`, number: 'null', isRead: false });
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: selectedManga.imgUrl }} style={styles.headerImage} />
          <TouchableOpacity
            style={styles.backView}
            onPress={() => Actions.pop()}
          >
            <Icon name="arrowThinLeft" style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.favoriteView}
            onPress={this.onFavoritePress}
          >
            <Icon
              name="heart"
              style={{
                ...styles.favoriteIcon,
                color: selectedManga.isFavorite ? AppColors.palette.red : AppColors.palette.grey,
              }}
            />
          </TouchableOpacity>
          <LinearGradient
            style={styles.gradientView}
            colors={[AppColors.palette.transparent, AppColors.palette.black]}
          >
            <Text style={styles.mangaName}>
              {selectedManga.name}
            </Text>
          </LinearGradient>
        </View>
        <View style={styles.pagesView}>
          <View style={styles.iconView}>
            {page > 0 && (
              <Icon name="arrowOutlineLeft" onPress={this.onPreviousPress} />
            )}
          </View>
          <ScrollView
            horizontal
            onScroll={this.onScroll}
            pagingEnabled
            ref={(node) => this.scroll = node}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={50}
          >
            {pages.map((item, index) => (
              <View style={styles.scrollView} key={`page_${index}`}>
                <Text style={styles.text}>
                  {`${chapters[item.indexMin].number} to ${chapters[item.indexMax].number}`}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.iconView}>
            {page < numberOfPages - 1 && (
              <Icon name="arrowOutlineRight" onPress={this.onNextPress} />
            )}
          </View>
        </View>
        <FlatList
          ref={(node) => this.flatList = node}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.flatList}
          data={chaptersWithEmpty}
          keyExtractor={(item) => item.id}
          numColumns={4}
          initialNumToRender={500}
          onEndReachedThreshold={300}
          renderItem={({ item }) => (
            <ChapterListItem chapter={item} />
          )}
        />
      </View>
    );
  }
}

ChaptersPage.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingStatus: PropTypes.object,
  markMangaAsFavorite: PropTypes.func.isRequired,
  selectedManga: PropTypes.object.isRequired,
};

ChaptersPage.defaultProps = {
  loadingStatus: { loading: false },
};

const mapStateToProps = (state) => ({
  chapters: state.chapter.chapters,
  loadingStatus: state.app[AppConstants.ROUTES.chapters],
  selectedManga: state.manga.selectedManga,
});

export default connect(mapStateToProps, MangaActions)(ChaptersPage);
