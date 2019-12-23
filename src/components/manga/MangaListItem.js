import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import AppColors from '../../app/app.colors';
import styles from './mangaListItem.styles';
import * as ChapterActions from '../../redux/actions/chapter-actions';

class MangaListItem extends React.Component {
  onMangaPress = () => {
    const { getChapters, manga } = this.props;
    getChapters(manga);
  }

  render() {
    const { manga } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.onMangaPress}
        style={styles.container}
      >
        <Image source={{ uri: manga.imgUrl }} style={styles.mangaImg} />
        <LinearGradient
          style={styles.gradientView}
          colors={[AppColors.palette.transparent, AppColors.palette.black]}
        >
          <Text style={styles.text}>
            {manga.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

MangaListItem.propTypes = {
  getChapters: PropTypes.func.isRequired,
  manga: PropTypes.object.isRequired,
};

export default connect(
  null,
  ChapterActions,
)(MangaListItem);
