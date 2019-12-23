import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import AppConstants from '../../app/app.constants';
import AppSizes from '../../app/app.sizes';
import AppStyles from '../../app/app.styles';
import Icon from '../../components/common/Icon';
import MangaListItem from '../../components/manga/MangaListItem';
import styles from './homePage.styles';
import * as MangaActions from '../../redux/actions/manga-actions';
import * as UserActions from '../../redux/actions/user-actions';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedFilterXPosition: new Animated.Value(0),
      animatedFilterAllColor: new Animated.Value(0),
      animatedFilterFavoritesColor: new Animated.Value(1),
      filter: 'all',
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

  onLogoutPress = () => {
    const { logout } = this.props;
    Alert.alert('Warning', 'Do you want to logout ?', [
      { text: 'NO', onPress: () => false, style: 'cancel' },
      { text: 'YES', onPress: () => logout() },
    ]);
  };

  onFilterAllPressed = () => {
    const {
      animatedFilterAllColor,
      animatedFilterFavoritesColor,
      animatedFilterXPosition,
      filter,
    } = this.state;
    if (filter !== 'all') {
      Animated.parallel([
        Animated.timing(animatedFilterXPosition, { toValue: 0, duration: 300 }),
        Animated.timing(animatedFilterAllColor, { toValue: 0, duration: 300 }),
        Animated.timing(animatedFilterFavoritesColor, { toValue: 1, duration: 300 }),
      ]).start(() => this.setState({ filter: 'all' }));
    }
  };

  onFilterFavoritesPressed = () => {
    const {
      animatedFilterAllColor,
      animatedFilterFavoritesColor,
      animatedFilterXPosition,
      filter,
    } = this.state;
    if (filter !== 'favorites') {
      Animated.parallel([
        Animated.timing(animatedFilterAllColor, { toValue: 1, duration: 300 }),
        Animated.timing(animatedFilterFavoritesColor, { toValue: 0, duration: 300 }),
        Animated.timing(animatedFilterXPosition, { toValue: AppSizes.screen.widthQuarter, duration: 300 }),
      ]).start(() => this.setState({ filter: 'favorites' }));
    }
  };

  render() {
    const { loadingStatus, mangas } = this.props;
    const {
      animatedFilterAllColor,
      animatedFilterFavoritesColor,
      animatedFilterXPosition,
      filter,
      search,
    } = this.state;

    const filterAllColor = animatedFilterAllColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)'],
    });
    const filterFavoritesColor = animatedFilterFavoritesColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)'],
    });

    if (loadingStatus.loading) {
      return (
        <View style={AppStyles.loadingView}>
          <ActivityIndicator size="large" color={AppColors.palette.red} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Top of header: appname, search, logout */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.appName}>
              MangApp
            </Text>
            <Icon name="search" style={styles.icon} />
            <TextInput
              style={styles.searchTextInput}
              onChangeText={(text) => this.onSearchChange(text.toLowerCase())}
              value={search}
              placeholder="search..."
              placeholderTextColor={AppColors.palette.greyDark}
              selectionColor={AppColors.palette.red}
              autoCapitalize="none"
            />
            <Icon name="power" onPress={this.onLogoutPress} style={{ ...styles.icon, marginLeft: 10 }} />
          </View>

          {/* bottom of header: filter animated view */}
          <View
            style={{
              padding: 5,
              backgroundColor: AppColors.palette.white,
              marginTop: 20,
              borderRadius: 50,
            }}
          >
            <View style={styles.filterView}>
              <Animated.View
                style={{
                  ...styles.filterAnimatedView,
                  transform: [{
                    translateX: animatedFilterXPosition,
                  }],
                }}
              />
              <View style={styles.filterViewText}>
                <TouchableOpacity style={styles.touchableHeaderView} onPress={this.onFilterAllPressed}>
                  <Animated.Text style={{ ...styles.touchableHeaderText, color: filterAllColor }}>
                    All
                  </Animated.Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableHeaderView} onPress={this.onFilterFavoritesPressed}>
                  <Animated.Text style={{ ...styles.touchableHeaderText, color: filterFavoritesColor }}>
                    Favorites
                  </Animated.Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Mangas list */}
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          data={filter === 'favorites'
            ? mangas.filter((manga) => manga.name.toLowerCase().includes(search) && manga.isFavorite)
            : mangas.filter((manga) => manga.name.toLowerCase().includes(search))}
          initialNumToRender={30}
          keyExtractor={(item) => item.name}
          onEndReachedThreshold={30}
          renderItem={({ item }) => <MangaListItem manga={item} />}
        />
      </View>
    );
  }
}

HomePage.propTypes = {
  getMangas: PropTypes.func.isRequired,
  loadingStatus: PropTypes.object,
  logout: PropTypes.func.isRequired,
  mangas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

HomePage.defaultProps = {
  loadingStatus: { loading: false },
};

const mapStateToProps = (state) => ({
  loadingStatus: state.app[AppConstants.ROUTES.home],
  mangas: state.manga.mangas,
});

export default connect(
  mapStateToProps,
  { ...MangaActions, ...UserActions },
)(HomePage);
