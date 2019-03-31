import React from 'react';
import { ImageBackground, View } from 'react-native';
import firebase from 'firebase';
import { Container, Content, Text, List, ListItem, Left, Icon, Body } from 'native-base';

class SideBar extends React.Component {
  state = {
    currentUser: null,
    routes: [
      {
        name: "HomeScreen",
        iconName: "home",
        iconType: "Ionicons",
        displayName: "Trang chủ"
      },
      {
        name: "Cart",
        iconName: "md-cart",
        iconType: "Ionicons",
        displayName: "Giỏ hàng"
      },
      {
        name: "OrderHistory",
        iconName: "md-albums",
        iconType: "Ionicons",
        displayName: "Quản lí đơn hàng"
      },
      {
        name: "AddressList",
        iconName: "address-book",
        iconType: "FontAwesome",
        displayName: "Sổ địa chỉ"
      },
      {
        name: "FAQ",
        iconName: "help-with-circle",
        iconType: "Entypo",
        displayName: "Trợ giúp"
      },
      {
        name: "CustomBurger",
        iconName: "hamburger",
        iconType: "MaterialCommunityIcons",
        displayName: "Tùy chỉnh Burger"
      },
      {
        name: "Location",
        iconName: "google-maps",
        iconType: "MaterialCommunityIcons",
        displayName: "Cửa hàng"
      },
      {
        name: "SignIn",
        iconName: "login",
        iconType: "MaterialCommunityIcons",
        displayName: "Đăng nhập"
      },
    ],
  };

//   componentWillMount() {
//     firebase.auth().onAuthStateChanged((currentUser) => {
//       this.setState({ currentUser: currentUser });

//       this.checkLoggedInState();
//    });
//   }

  checkLoggedInState = () => {
    const newRoutes = [...this.state.routes];

    console.log(this.state.currentUser);
    if (!this.state.currentUser || this.state.currentUser.isAnonymous) {
      newRoutes[newRoutes.length - 1] = {
        name: "SignIn",
        iconName: "login",
        iconType: "MaterialCommunityIcons",
        displayName: "Đăng nhập"
      }
    } else {
      newRoutes[newRoutes.length - 1] = {
        name: "SignOut",
        iconName: "logout",
        iconType: "MaterialCommunityIcons",
        displayName: "Đăng xuất"
      };
    }

    this.setState({ routes: newRoutes });
  }

  onRoutePress = (routeName) => {
    if (routeName === "SignOut") {
      firebase.auth().signOut()
        .then(() => {
          this.props.navigation.closeDrawer();
          this.props.navigation.navigate('HomeScreen');
        });
    } else {
      this.props.navigation.navigate(routeName)
    }
  }

  renderRowItem = (data) => {
    return (
      <ListItem
        icon
        button
        onPress={() => this.onRoutePress(data.name)}
        >
        <Left>
          <Icon style={{ fontSize: 23 }} name={data.iconName} type={data.iconType} />
        </Left>
        <Body>
          <Text style={{fontFamily: 'VarelaRound'}}>{data.displayName}</Text>
        </Body>
      </ListItem>
    );
  }

  _renderName = () => {
    if (this.state.currentUser) {
      if (this.state.currentUser.email) {
        return this.state.currentUser.email;
      }
      return 'Guest';
    }

    return 'None';
  }

  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            // source={{
            //   uri: "https://png.pngtree.com/element_our/md/20180710/md_5b4443609289b.jpg"
            // }}
            source={require('../../assets/sidebarLogo.png')}
            style={{
              height: 150,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
          </ImageBackground>
          <List
            dataArray={this.state.routes}
            renderRow={(data) => this.renderRowItem(data)}
          />
          <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 50, color: '#888888' }}>{this._renderName()}</Text>
        </Content>
      </Container>
  );
  }
};

export default SideBar;