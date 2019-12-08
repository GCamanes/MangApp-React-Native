import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Alert,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from './mangaListItem.styles';
import * as MangaActions from '../../redux/actions/manga-actions';

export class MangaListItem extends React.Component {
  render() {
    const { manga } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: manga.imgUrl }} style={styles.mangaImg} />
        <Text>{manga.name}</Text>
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
