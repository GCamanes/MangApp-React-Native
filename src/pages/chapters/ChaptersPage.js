import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import AppSizes from '../../app/app.sizes';
import AppStyles from '../../app/app.styles';
import ChapterListItem from '../../components/chapter/ChapterListItem';
import CustomLoader from '../../components/common/CustomLoader';
import Icon from '../../components/common/Icon';
import styles from './chaptersPage.styles';

class ChaptersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
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
  }

  render() {
    const { chapters, loadingStatus } = this.props;
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
          <CustomLoader />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.pagesView}>
          <View style={styles.iconView}>
            {page > 0 && (
              <Icon name="backward" onPress={this.onPreviousPress} />
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
              <Icon name="forward" onPress={this.onNextPress} />
            )}
          </View>
        </View>
        <FlatList
          ref={(node) => this.flatList = node}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.flatList}
          data={chapters.filter((chap, index) => index >= pages[page].indexMin && index <= pages[page].indexMax)}
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
