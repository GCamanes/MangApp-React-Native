import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import Icon from '../common/Icon';
import styles from './mangaListItem.styles';
import * as MangaActions from '../../redux/actions/manga-actions';

class MangaListItem extends React.Component {
  onFavoritePress = () => {
    const { manga, markMangaAsFavorite } = this.props;
    markMangaAsFavorite(manga.name, !manga.isFavorite);
  }

  render() {
    const { manga } = this.props;
    return (
      <View style={styles.container}>
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
        <TouchableOpacity
          onPress={this.onFavoritePress}
          style={styles.favoriteView}
        >
          <Icon
            name={manga.isFavorite ? 'starFull' : 'starEmpty'}
            style={{ color: manga.isFavorite ? AppColors.palette.red : AppColors.palette.red }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

MangaListItem.propTypes = {
  manga: PropTypes.object.isRequired,
  markMangaAsFavorite: PropTypes.func.isRequired,
};

export default connect(
  null,
  MangaActions,
)(MangaListItem);
