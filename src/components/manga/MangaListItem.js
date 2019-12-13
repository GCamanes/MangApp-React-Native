import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import FontMangApp from '../../assets/icons/icons-mangapp';
import styles from './mangaListItem.styles';
import * as MangaActions from '../../redux/actions/manga-actions';
import * as ChapterActions from '../../redux/actions/chapter-actions';

class MangaListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSize: new Animated.Value(AppFonts.t25.size),
    };
  }

  onMangaPress = () => {
    const { getChapters, manga } = this.props;
    getChapters(manga);
  }

  onFavoritePress = () => {
    const { manga, markMangaAsFavorite } = this.props;
    const { iconSize } = this.state;

    Animated.sequence([
      Animated.timing(
        iconSize,
        {
          toValue: AppFonts.t40.size,
          duration: 400,
        },
      ),
      Animated.timing(
        iconSize,
        {
          toValue: AppFonts.t25.size,
          duration: 400,
        },
      ),
    ]).start(() => markMangaAsFavorite(manga.name, !manga.isFavorite));
  }

  render() {
    const { manga } = this.props;
    const { iconSize } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.onMangaPress}
        style={styles.container}
      >
        <Image source={{ uri: manga.imgUrl }} style={styles.mangaImg} />
        <View style={styles.infosView}>
          <Text
            style={{
              color: AppColors.palette.black,
              fontSize: AppFonts.t15.size,
              fontWeight: 'bold',
            }}
          >
            {manga.name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: AppColors.palette.grey, fontWeight: 'bold' }}>
              Last chapter:
            </Text>
            <Text style={{ color: AppColors.palette.black }}>
              {` ${manga.lastChapter}`}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: AppColors.palette.grey, fontWeight: 'bold'}}>
              Status:
            </Text>
            <Text
              style={{
                color: (manga.status === 'Completed') ? 'green' : AppColors.palette.red,
                fontWeight: 'bold',
              }}
            >
              {` ${manga.status}`}
            </Text>
          </View>
        </View>
        <Animated.View style={styles.favoriteView}>
          <TouchableOpacity
            onPress={this.onFavoritePress}
            style={styles.favoriteTouchableView}
          >
            <Animated.Text
              style={{
                ...styles.icon,
                color: manga.isFavorite ? AppColors.palette.red : AppColors.palette.red,
                fontSize: iconSize,
              }}
            >
              {FontMangApp[manga.isFavorite ? 'starFull' : 'starEmpty']}
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

MangaListItem.propTypes = {
  getChapters: PropTypes.func.isRequired,
  manga: PropTypes.object.isRequired,
  markMangaAsFavorite: PropTypes.func.isRequired,
};

export default connect(
  null,
  { ...MangaActions, ...ChapterActions },
)(MangaListItem);
