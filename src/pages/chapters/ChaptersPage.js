import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import AppStyles from '../../app/app.styles';
import ChapterListItem from '../../components/chapter/ChapterListItem';
import CustomLoader from '../../components/common/CustomLoader';
import styles from './chaptersPage.styles';

class ChaptersPage extends Component {
  render() {
    const { chapters, loadingStatus } = this.props;

    if (loadingStatus.loading) {
      return (
        <View style={AppStyles.loadingView}>
          <CustomLoader />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.flatList}
          data={chapters}
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
};

ChaptersPage.defaultProps = {
  loadingStatus: { loading: false },
};

const mapStateToProps = (state) => ({
  chapters: state.chapter.chapters,
  loadingStatus: state.app[AppConstants.ROUTES.chapters],
});

export default connect(mapStateToProps, null)(ChaptersPage);
