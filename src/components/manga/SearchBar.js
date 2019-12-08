import PropTypes from 'prop-types';
import React from 'react';
import {
  TextInput,
  View,
} from 'react-native';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import Icon from '../common/Icon';
import styles from './searchBar.styles';

const SearchBar = ({ onCancelSearch, onSearchChange, value }) => (
  <View style={styles.searchBarView}>
    <View style={styles.searchBarSubView}>
      <Icon
        name="keyboard"
        style={{
          color: AppColors.palette.blackSmoke,
          marginHorizontal: 3,
          fontSize: AppFonts.t18.size,
        }}
      />
      <TextInput
        style={styles.searchTextInput}
        onChangeText={(text) => onSearchChange(text.toLowerCase())}
        value={value}
        placeholder="search manga by name..."
        selectionColor={AppColors.palette.red}
        autoCapitalize="none"
      />
      <Icon
        onPress={onCancelSearch}
        name="cross"
        style={{
          color: AppColors.palette.blackSmoke,
          marginHorizontal: 3,
          fontSize: AppFonts.t16.size,
        }}
      />
    </View>
  </View>
);

SearchBar.propTypes = {
  onCancelSearch: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchBar;
