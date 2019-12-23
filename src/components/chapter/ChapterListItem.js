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
import * as ScanActions from '../../redux/actions/scan-actions';

const styles = StyleSheet.create({
  container: {
    width: AppSizes.screen.width * 0.215,
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
    const { chapter, getScans, selectedManga } = this.props;
    getScans(selectedManga, chapter);
  }

  onLongPress = () => {
    const { chapter, markChapterAsRead, selectedManga } = this.props;
    markChapterAsRead(selectedManga, chapter.id, !chapter.isRead);
  }

  render() {
    const { chapter } = this.props;
    if (chapter.id.includes('chapterNull')) {
      return (
        <View style={styles.container}>
          <Text>
            null
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        delayLongPress={1500} // need to be set to +1000 when remote debugger is on
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
  }),
  getScans: PropTypes.func.isRequired,
  markChapterAsRead: PropTypes.func.isRequired,
  selectedManga: PropTypes.object.isRequired,
};

ChapterListItem.defaultProps = {
  chapter: null,
};

const mapStateToProps = (state) => ({
  selectedManga: state.manga.selectedManga,
});

export default connect(
  mapStateToProps,
  { ...ChapterActions, ...ScanActions },
)(ChapterListItem);
