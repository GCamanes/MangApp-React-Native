import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  SectionList,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import AppStyles from '../../app/app.styles';
import CustomLoader from '../../components/common/CustomLoader';
import styles from './homePage.styles';
import * as MangaActions from '../../redux/actions/manga-actions';

class HomePage extends Component {
  componentDidMount() {
    const { getMangas } = this.props;
    getMangas();
  }

  render() {
    const { loadingStatus, mangas } = this.props;
    if (loadingStatus.loading) {
      return (
        <View style={AppStyles.loadingView}>
          <CustomLoader />
        </View>
      );
    }
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
  loadingStatus: PropTypes.object,
  mangas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

HomePage.defaultProps = {
  loadingStatus: { loading: false },
};

const mapStateToProps = (state) => ({
  loadingStatus: state.app[AppConstants.ROUTES.home],
  mangas: state.manga.mangas,
});

export default connect(mapStateToProps, MangaActions)(HomePage);
