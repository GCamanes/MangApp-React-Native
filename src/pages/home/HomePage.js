import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  SectionList,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './homePage.styles';
import * as MangaActions from '../../redux/actions/manga-actions';

class HomePage extends Component {
  componentDidMount() {
    const { getMangas } = this.props;
    getMangas();
  }

  render() {
    const { mangas } = this.props;
    return (
      <View style={styles.container}>
        <SectionList
          initialNumToRender={30}
          keyExtractor={(item) => item.name}
          onEndReachedThreshold={30}
          renderItem={({ item }) => <Text style={{ color: 'grey' }}>{item.name}</Text>}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ color: 'white' }}>{title}</Text>
          )}
          sections={[
            {
              title: 'Favorites',
              data: mangas.filter(
                (item) => item.isFavorite,
              ),
            },
            {
              title: 'Others',
              data: mangas.filter(
                (item) => !item.isFavorite,
              ),
            },
          ]}
        />
      </View>
    );
  }
}

HomePage.propTypes = {
  getMangas: PropTypes.func.isRequired,
  mangas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  mangas: state.manga.mangas,
});

export default connect(mapStateToProps, MangaActions)(HomePage);
