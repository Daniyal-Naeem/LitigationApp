import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  Platform,
  VirtualizedList,
} from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Icon,
  Item,
  Input,
  Header,
  Left,
  Body,
  Right,
} from 'native-base';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// import Header from '../components/Header';
import {Theme} from '../common/Theme';

const marginTop = Platform.OS == 'ios' ? 0 : 30;
export default class SearchableList extends Component {
  constructor(props) {
    // const DUMMY_DATA = [];
    // for (let i = 0; i < 20; i++) {
    //   DUMMY_DATA.push('Item ' + i);
    // }
    super(props);
    // const data = props.navigation.getParam('data', []);
    let {data} = props.route.params;
    data = data ? data : [];
    this.state = {
      listItemNames: data, // data, // all items
      listItemIds: data, //data,
      shownItemNames: data, //data, // which items to show in list
      shownItemIds: data, //data,

      isWaiting: false,
      searchQuery: '',
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.search = this.search.bind(this);
  }

  render() {
    return (
      <Container style={{backgroundColor: Theme.BackgroundColor}}>
        <Header
          style={{
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            elevation: 0,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: marginTop,
          }}>
          <Left style={{maxWidth: 40}}>
            <Icon
              name="arrowleft"
              type="AntDesign"
              // style={{color: 'gray'}}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>
          <Body style={{flex: 1}}>
            <Item rounded>
              <Input
                autoFocus={false}
                placeholder="Search here..."
                placeholderTextColor="#cfcfcf"
                onChangeText={this.onTextChange}
                value={this.state.searchQuery}
                multiline={false}
                numberOfLines={1}
              />

              <Icon
                name={'closecircleo'}
                type="AntDesign"
                style={{color: '#aeaeae'}}
                onPress={() => this.onTextChange('')}
              />
            </Item>
          </Body>
          {/* <Right style={{maxWidth: 40,}}>
          
          </Right> */}
        </Header>
        <StatusBar
          backgroundColor={Theme.BackgroundColor}
          barStyle="dark-content"
        />

        <View style={{backgroundColor: Theme.BackgroundDim, flex: 1}}>
          {this.state.listItemNames.length > 0 ? (
            <VirtualizedList
              keyExtractor={item => 'item-' + item.id}
              showsVerticalScrollIndicator={false}
              data={this.state.shownItemNames}
              getItemCount={(data, index) => data?.length}
              getItem={(data, index) => data[index]}
              initialNumToRender={30}
              renderItem={({item, index}) => (
                // <TouchableOpacity onPress={() => {
                //     this.props.navigation.state.params.onItemSelect(item)
                //     this.props.navigation.pop()
                // }}>
                <ListItem
                  key={'item-' + item.id}
                  onPress={() => {
                    this.props.route.params.onItemSelect(item);
                    this.props.navigation.pop();
                  }}>
                  <Text>{item.title}</Text>
                </ListItem>
                // </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={{alignSelf: 'center', marginTop: 20}}>
              No item to select
            </Text>
          )}
        </View>
      </Container>
    );
  }

  onTextChange(text) {
    this.setState({searchQuery: text}, this.search);
  }

  search() {
    if (this.state.isWaiting) {
      return;
    }
    if (this.state.searchQuery.trim() == '') {
      this.setState({
        // shownItemIds: this.state.listItemIds,
        shownItemNames: this.state.listItemNames,
      });
      return;
    }
    this.setState({isWaiting: true});
    setTimeout(() => {
      let {
        // listItemIds,
        listItemNames,
        shownItemNames,
        shownItemIds,
        searchQuery,
      } = this.state;
      shownItemNames = [];
      shownItemIds = [];
      for (let i = 0; i < listItemNames.length; i++) {
        if (
          listItemNames[i].title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          // shownItemIds.push(listItemIds[i]);
          shownItemNames.push(listItemNames[i]);
        }
      }
      this.setState({
        shownItemNames: shownItemNames,
        // shownItemIds: shownItemIds,
        isWaiting: false,
      });
    }, 100);
  }
}
