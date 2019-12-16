import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import AppSizes from '../../app/app.sizes';
import * as ChapterActions from '../../redux/actions/chapter-actions';

const styles = StyleSheet.create({
  container: {
    width: AppSizes.screen.width * 0.215,
    backgroundColor: AppColors.palette.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 4,
  },
  text: {
    fontSize: AppFonts.t17.size,
    fontWeight: 'bold',
  },
});

class ChapterListItem extends React.Component {
  onPress = () => {
    const { chapter, selectedManga } = this.props;
    console.log('CHAPTER PRESS', selectedManga.name, chapter.id);
  }

  onLongPress = () => {
    const { chapter, markChapterAsRead, selectedManga } = this.props;
    markChapterAsRead(selectedManga, chapter.id, !chapter.isRead);
  }

  render() {
    const { chapter } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        delayLongPress={1000} // need to be set to +1000 when remote debugger is on
        onPress={this.onPress}
        onLongPress={this.onLongPress}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: chapter.isRead ? AppColors.palette.yellow : AppColors.palette.white,
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: chapter.isRead ? AppColors.palette.black : AppColors.palette.red,
            }}
          >
            {chapter.number}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ChapterListItem.propTypes = {
  chapter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    isRead: PropTypes.bool.isRequired,
  }).isRequired,
  markChapterAsRead: PropTypes.func.isRequired,
  selectedManga: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  selectedManga: state.manga.selectedManga,
});

export default connect(
  mapStateToProps,
  { ...ChapterActions },
)(ChapterListItem);
