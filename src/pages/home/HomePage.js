import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  SectionList,
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
import MangaSectionTitle from '../../components/manga/MangaSectionTitle';
import styles from './homePage.styles';
import * as MangaActions from '../../redux/actions/manga-actions';
import * as UserActions from '../../redux/actions/user-actions';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedFilterWidth: new Animated.Value(AppSizes.screen.widthQuarter),
      animatedFilterXPosition: new Animated.Value(0),
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
    const { animatedFilterWidth, animatedFilterXPosition, filter } = this.state;
    if (filter !== 'all') {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animatedFilterWidth, { toValue: AppSizes.screen.widthHalf, duration: 200 }),
          Animated.timing(animatedFilterXPosition, { toValue: 0, duration: 200 }),
        ]),
        Animated.timing(animatedFilterWidth, { toValue: AppSizes.screen.widthQuarter, duration: 200 }),
      ]).start(() => this.setState({ filter: 'all' }));
    }
  };

  onFilterFavoritesPressed = () => {
    const { animatedFilterWidth, animatedFilterXPosition, filter } = this.state;
    if (filter !== 'favorites') {
      Animated.sequence([
        Animated.timing(animatedFilterWidth, { toValue: AppSizes.screen.widthHalf, duration: 200 }),
        Animated.parallel([
          Animated.timing(animatedFilterWidth, { toValue: AppSizes.screen.widthQuarter, duration: 200 }),
          Animated.timing(animatedFilterXPosition, { toValue: AppSizes.screen.widthQuarter, duration: 200 }),
        ]),
      ]).start(() => this.setState({ filter: 'favorites' }));
    }
  };

  render() {
    const { loadingStatus, mangas } = this.props;
    const {
      animatedFilterXPosition,
      animatedFilterWidth,
      filter,
      search,
    } = this.state;

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
            <Icon name="power" onPress={this.onLogoutPress} style={styles.icon} />
          </View>

          {/* bottom of header: filter animated view */}
          <View style={{ padding: 5, backgroundColor: AppColors.palette.white, marginTop: 20, borderRadius: 50 }}>
            <View style={styles.filterView}>
              <Animated.View
                style={{
                  ...styles.filterAnimatedView,
                  width: animatedFilterWidth,
                  transform: [{
                    translateX: animatedFilterXPosition,
                  }],
                }}
              />
              <View style={styles.filterViewText}>
                <TouchableOpacity style={styles.touchableHeaderView} onPress={this.onFilterAllPressed}>
                  <Text
                    style={[
                      styles.touchableHeaderText,
                      filter === 'all' ? {
                        color: AppColors.palette.white,
                        fontWeight: 'bold',
                      } : {
                        color: AppColors.palette.black,
                        fontWeight: 'normal',
                      },
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableHeaderView} onPress={this.onFilterFavoritesPressed}>
                  <Text
                    style={[
                      styles.touchableHeaderText,
                      filter === 'favorites' ? {
                        color: AppColors.palette.white,
                        fontWeight: 'bold',
                      } : {
                        color: AppColors.palette.black,
                        fontWeight: 'normal',
                      },
                    ]}
                  >
                    Favorites
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Mangas list */}
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
