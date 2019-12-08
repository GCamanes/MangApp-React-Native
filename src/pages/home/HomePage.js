import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  SectionList,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import AppStyles from '../../app/app.styles';
import CustomLoader from '../../components/common/CustomLoader';
import MangaListItem from '../../components/manga/MangaListItem';
import MangaSectionTitle from '../../components/manga/MangaSectionTitle';
import SearchBar from '../../components/manga/SearchBar';
import styles from './homePage.styles';
import * as MangaActions from '../../redux/actions/manga-actions';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    const { getMangas } = this.props;
    getMangas();
  }

  onSearchChange = (search) => {
    this.setState({ search });
  };

  onCancelSearch = () => {
    this.setState({ search: '' });
  };

  render() {
    const { loadingStatus, mangas } = this.props;
    const { search } = this.state;

    if (loadingStatus.loading) {
      return (
        <View style={AppStyles.loadingView}>
          <CustomLoader />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SearchBar
          onSearchChange={this.onSearchChange}
          onCancelSearch={this.onCancelSearch}
          value={search}
        />
        <SectionList
          initialNumToRender={30}
          keyExtractor={(item) => item.name}
          onEndReachedThreshold={30}
          renderItem={({ item }) => <MangaListItem manga={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <MangaSectionTitle title={title} />
          )}
          sections={[
            {
              title: 'Favorites',
              data: mangas.filter(
                (item) => item.name.toLowerCase().includes(search) && item.isFavorite,
              ),
            },
            {
              title: 'Others',
              data: mangas.filter(
                (item) => item.name.toLowerCase().includes(search) && !item.isFavorite,
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
