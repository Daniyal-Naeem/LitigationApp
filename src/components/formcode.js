import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Container, Content, Row, Icon, Item, Button} from 'native-base';
import TextInputMask from 'react-native-text-input-mask';
import Analytics from 'appcenter-analytics';

import AppHeader from '../components/AppHeader';
import {
  InputType,
  Constant,
  process,
  getDataFrom,
  ShowToast,
  CustomLog,
  ShowAlert,
  sendPageView,
} from '../common/Constants';
import MyTextInput from '../components/MyTextInput';
import {Theme, Fonts} from '../common/Theme';
import TitleCard from '../components/TitleCard';
import RadioButtonGroup from '../components/RadioButtonGroup';
import MyCheckBox from '../components/MyCheckBox';
import Map from '../components/Map';
import FileUploader from '../components/FileUploader';
import LoadingButton from '../components/LoadingButton';
import store from '../store';
import Api from '../apis';
import Geolocation from 'react-native-geolocation-service';
import Cache from '../common/Cache';
import MultipleSelect from '../components/MultipleSelect';
import FormDropdown from '../components/FormDropdown';

const AvenirFont = Fonts.AvenierMedium;
const AvenirLightFont = Fonts.AvenierLight;
class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.params = props.route.params.item;
    this.selectedItems = props.route.params.selectedItems;
    this.formType = this.params.title;
    CustomLog('form-structure', this.params.form);
    this.formStructure = this.params.form;

    const cache = Cache.LocalData;
    this.state = {
      isLoading: true,
      isSaving: false,
      // districtsList: [],
      is_social_responsibility: false,
      enchroachment_type: 'temporary',
      loadingTehsil: false,
      loadingCouncil: false,
      districtsList: cache?.districts,
      tehsilsList: cache?.tehsils,
    };

    this.session = store.SessionData;
    this.api = new Api(this.session.jwt_auth_token);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    try {
      if (this.state.districtsList?.length > 0) {ca
        this.setState({isLoading: false});
      } else {
        this.getDistricts();
      }
    } catch (error) {
      this.getDistricts();
      Analytics.trackEvent('FormDistrictsError', {error: error});
    }

    try {
      const map = this.formStructure.find(field => field.type == InputType.MAP);
      CustomLog('map-field', map);
      if (map && map.hidden) {
        this.getCurrentLocation(map);
      }
    } catch (error) {
      CustomLog('auto-location', error);
    }
    sendPageView('Form: ' + this.params?.title);
  }

  render() {
    return (
      <Container style={{backgroundColor: Theme.BackgroundColor}}>
        <AppHeader
          showBackIcon={true}
          navigation={this.props.navigation}
          userInfo={this.session}
        />
        {this.state.isLoading ? (
          <ActivityIndicator
            color={Theme.ColorPrimary}
            size="large"
            style={{alignSelf: 'center'}}
          />
        ) : (
          <Content style={{padding: Constant.ContentPadding}}>
            <TitleCard
              title={this.params.title}
              subTitle={this.params.subTitle}
              style={{marginBottom: 0}}
            />
            {this.displayForm(this.formStructure)}

            {/* Submit button */}
            <LoadingButton
              title="SUBMIT"
              isLoading={this.state.isSaving}
              style={{
                marginTop: 40,
                alignSelf: 'center',
                borderRadius: 5,
                width: '100%',
                maxWidth: 400,
                marginBottom: 20,
              }}
              onPress={this.onSubmit}
              // onPress={() => alert('lckmdlkcmdl')}
            />

            {/* margin-bottom; for complete scroll */}
            <View style={{height: 60}} />
          </Content>
        )}
      </Container>
    );
  }

  displayForm(fields) {
    let form = fields.map(field => this.getField(field));
    return form;
  }

  getField(field) {
    let val = this.state[field.id];
    switch (field.type) {
      case InputType.TEXT:
        return (
          <MyTextInput
            key={field.type + '-' + field.id}
            value={val ? val : ''}
            onChangeText={text => this.setState({[field.id]: text})}
            placeholder={field.name}
            placeholderTextColor="#afafaf"
            background={Theme.InputColorGreen}
            inputStyle={styles.input}
          />
        );

      case InputType.TEXTAREA:
        // issue: text is align centered vertically
        return (
          <MyTextInput
            key={field.type + '-' + field.id}
            value={val ? val : ''}
            onChangeText={text => this.setState({[field.id]: text})}
            placeholder={field.name}
            placeholderTextColor="#afafaf"
            background={Theme.InputColorGreen}
            inputStyle={{...styles.input, height: 120}}
          />
        );

      case InputType.NUMBER:
        return (
          <TextInputMask
            key={field.type + '-' + field.id}
            placeholder={field.name}
            mask={field.mask}
            placeholderTextColor="#afafaf"
            style={styles.inputMask}
            keyboardType="number-pad"
            value={val ? val : ''}
            onChangeText={(formatted, extracted) => {
              // console.log(formatted) // +1 (123) 456-78-90
              // console.log(extracted) // 1234567890
              this.setState({[field.id]: extracted});
            }}
          />
        );

      case InputType.RADIO_BUTTONS:
        return (
          <View style={{marginTop: 30}} key={field.type + '-' + field.id}>
            <Text
              style={{
                fontSize: 16,
                color: Theme.TextGray,
                fontFamily: AvenirFont,
              }}>
              {field.name}
            </Text>
            <RadioButtonGroup
              options={field.options}
              value={val ? val : ''}
              onPress={value => this.setState({[field.id]: value})}
              style={{marginTop: 10, marginBottom: 10}}
              buttonWrapperStyle={{marginTop: 10}}
              formHorizontal={!field.vertical}
            />
          </View>
        );

      case InputType.CHECK_BOXES:
        return (
          <View key={field.type + '-' + field.id}>
            {field.options.map(option => (
              <Row style={{marginTop: 15, alignItems: 'center'}}>
                <MyCheckBox
                  checked={this.state[option.key]}
                  onPress={() =>
                    this.setState({[option.key]: !this.state[option.key]})
                  }
                />
                <Text style={styles.label}>{option.label}</Text>
              </Row>
            ))}
          </View>
        );

      case InputType.DROP_DOWN:
        if (field.is_district) {
          return (
            <>
              <TouchableOpacity
                key={field.type + '-' + field.id}
                style={{
                  flex: 1,
                  backgroundColor: Theme.InputColorGreen,
                  padding: 15,
                  paddingLeft: 20,
                  marginTop: 20,
                }}
                onPress={() => {
                  this.props.navigation.navigate('SearchableList', {
                    data: this.state.districtsList,
                    onItemSelect: district => {
                      this.setState({[field.id]: district});
                      if (field.child) {
                        this.setState({
                          ['parent_' + field.child.id]: district.id,
                          [field.child.id]: undefined,
                        });
                      }
                    },
                  });
                }}>
                <Row>
                  <Text
                    style={{
                      color: this.state.district ? Theme.TextBlack : '#afafaf',
                      fontSize: 14,
                      flex: 1,
                      fontFamily: AvenirFont,
                    }}>
                    {/* {field.name} */}
                    {this.state.district
                      ? this.state.district.title
                      : field.name}
                  </Text>
                  <Icon
                    name="down"
                    type="AntDesign"
                    style={{fontSize: 16, color: '#afafaf'}}
                  />
                </Row>
              </TouchableOpacity>

              {field.child &&
                this.getField({
                  ...field.child,
                  // name: field.child.placeholder,
                  // type: InputType.DROP_DOWN,
                  district_id: this.state['parent_' + field.child.id],
                })}
            </>
          );
        } else {
          return (
            <FormDropdown
              field={field}
              navigation={this.props.navigation}
              // data={this.state.districtsList}
              onChange={item => this.setState({[field.id]: item})}
              value={val}
              districtId={
                field.district_id
                  ? field.district_id
                  : this.session?.district_id
              }
              token={this.session?.jwt_auth_token}
            />
          );
        }

      case InputType.MAP:
        return (
          <View style={{marginTop: 40}} key={field.type + '-' + field.id}>
            <Row>
              <Text
                style={{
                  fontFamily: AvenirLightFont,
                  color: '#999AA6',
                  fontSize: 14,
                  flex: 1,
                }}>
                {field.name}
              </Text>
            </Row>

            {/* Add location input */}
            {!field.hidden ? (
              <Item
                onPress={() =>
                  this.props.navigation.navigate('PlacesSearch', {
                    onLocationSelect: (data, details = null) => {
                      // CustomLog('details', details);
                      if (!details) {
                        return;
                      }
                      const location = details.geometry
                        ? details.geometry.location
                        : undefined;

                      if (location) {
                        this.setState({
                          [field.id + '_lat']: location.lat,
                          [field.id + '_lng']: location.lng,
                          [field.id]: details.formatted_address,
                          address: details.formatted_address,
                        });
                      }
                    },
                  })
                }
                style={{
                  ...styles.input,
                  padding: 10,
                  paddingLeft: 20,
                  backgroundColor: Theme.InputColorGreen,
                  borderWidth: 0,
                }}>
                <Text
                  style={{
                    fontFamily: AvenirFont,
                    fontSize: 14,
                    color: val ? Theme.TextBlack : '#afafaf',
                    flex: 1,
                  }}>
                  {this.state.gettingCurrentLoc
                    ? 'Getting current location...'
                    : val && val != ''
                    ? val
                    : field.placeholder}
                </Text>

                <Icon
                  name="my-location"
                  type="MaterialIcons"
                  style={{
                    color: 'gray',
                    width: 60,
                    height: 30,
                    textAlign: 'right',
                  }}
                  onPress={() => {
                    this.getCurrentLocation(field);
                  }}
                />
              </Item>
            ) : val == undefined && !this.state.gettingCurrentLoc ? (
              <Row>
                <Text
                  style={{
                    fontFamily: AvenirLightFont,
                    color: '#999AA6',
                    fontSize: 14,
                    alignSelf: 'center',
                    color: '#d62d2d',
                  }}>
                  Failed to get your location!
                </Text>

                <Button
                  transparent
                  onPress={() => this.getCurrentLocation(field)}>
                  <Text style={{paddingHorizontal: 5, color: '#2d71d6'}}>
                    Try again
                  </Text>
                </Button>
              </Row>
            ) : (
              <></>
            )}
            <Map
              gettingLocation={this.state.gettingCurrentLoc}
              containerStyle={{
                height: 250,
                // marginBottom: 50,
                marginTop: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 3,
                overflow: 'hidden',
              }}
              lat={this.state[field.id + '_lat']}
              lng={this.state[field.id + '_lng']}
              onMapClick={e => {
                if (field.hidden) return;
                const {latitude, longitude} = e.nativeEvent.coordinate;
                // console.log('map-click-2', latitude, longitude);
                this.setState({
                  // latitude: latitude,
                  // longitude: longitude,

                  [field.id + '_lat']: latitude,
                  [field.id + '_lng']: longitude,
                });
              }}
            />

            <Text style={{fontSize: 10}}>
              Latitude: {this.state[field.id + '_lat']}
            </Text>
            <Text style={{fontSize: 10}}>
              Longitude: {this.state[field.id + '_lng']}
            </Text>
          </View>
        );

      case InputType.FILE:
        return (
          <FileUploader
            key={field.type + '-' + field.id}
            // check for in progress-upload => this.attachmentUploader.uploadInProgress()
            ref={ref => (this.attachmentUploader = ref)}
            addNewFile={file => {
              let attachments = this.state[field.id];
              if (!attachments) {
                attachments = [];
              }
              attachments.push(file);
              // this.setState({attachments: attachments});
              this.setState({[field.id]: attachments});
            }}
            removeFile={atIndex => {
              const attachments = this.state[field.id];
              attachments.splice(atIndex, 1);
              this.setState({[field.id]: attachments});
            }}
            formType={this.formType}
            style={{marginTop: 50}}
            field={field}
          />
        );

      case InputType.HEADING:
        return (
          <Text key={field.type + '-' + field.id} style={styles.formHeading}>
            {field.name}
          </Text>
        );

      case InputType.DEMOGRAPHICS:
        return this.getDemographics(field);

      case InputType.MULTIPLE_SELECT:
        return (
          <MultipleSelect
            key={field.type + '-' + field.id}
            navigation={this.props.navigation}
            onItemSelect={items => this.setState({[field.id]: items})}
            field={field}
            districtId={this.session?.district_id}
            token={this.session?.jwt_auth_token}
            style={styles.input}
          />
        );

      default:
        break;
    }
  }

  getCurrentLocation(field) {
    CustomLog('Getting location...');
    this.setState({gettingCurrentLoc: true});
    Geolocation.getCurrentPosition(
      location => {
        CustomLog(location);
        // if(location.coords)
        this.setState({
          [field.id + '_lat']: location.coords.latitude,
          [field.id + '_lng']: location.coords.longitude,
          [field.id]: 'Current Location',
          address: 'Current Location',
          gettingCurrentLoc: false,
        });
      },
      error => {
        CustomLog(error);
        ShowAlert(
          'Sorry',
          'Unable to get your location, kindly enable GPS & try again.',
        );
        this.setState({gettingCurrentLoc: false});
      },
    );
  }

  getDemographics(field) {
    return (
      <>
        {field.show_districts && (
          <TouchableOpacity
            key={field.type + '-district'}
            style={{
              flex: 1,
              backgroundColor: Theme.InputColorGreen,
              padding: 15,
              paddingLeft: 20,
              marginTop: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate('SearchableList', {
                data: this.state.districtsList,
                onItemSelect: district => {
                  this.setState({
                    district: district,
                    tehsil: undefined,
                    council: undefined,
                    // loadingTehsil: field.show_tehsil,
                  });
                  if (field.show_tehsil) {
                    // this.getTehsil(district.id);
                    this.setState({tehsilsList: district?.tehsils});
                  }
                },
              });
            }}>
            <Row>
              <Text
                style={{
                  color: this.state.district ? Theme.TextBlack : '#afafaf',
                  fontSize: 14,
                  flex: 1,
                  fontFamily: AvenirFont,
                }}>
                {this.state.district ? this.state.district.title : 'District'}
              </Text>
              <Icon
                name="down"
                type="AntDesign"
                style={{fontSize: 16, color: '#afafaf'}}
              />
            </Row>
          </TouchableOpacity>
        )}

        {field.show_tehsil && (
          <TouchableOpacity
            key={field.type + '-tehsil'}
            style={{
              flex: 1,
              backgroundColor: Theme.InputColorGreen,
              padding: 15,
              paddingLeft: 20,
              marginTop: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate('SearchableList', {
                data: this.state.tehsilsList,
                onItemSelect: tehsil => {
                  this.setState({
                    tehsil: tehsil,
                    council: undefined,
                    loadingCouncil: field.show_council,
                  });
                  if (field.show_council) {
                    this.getUCs(tehsil.id);
                  }
                },
              });
            }}>
            <Row>
              <Text
                style={{
                  color: this.state.tehsil ? Theme.TextBlack : '#afafaf',
                  fontSize: 14,
                  flex: 1,
                  fontFamily: AvenirFont,
                }}>
                {this.state.loadingTehsil
                  ? 'Loading...'
                  : this.state.tehsil
                  ? this.state.tehsil.title
                  : 'Tehsil'}
              </Text>
              <Icon
                name="down"
                type="AntDesign"
                style={{fontSize: 16, color: '#afafaf'}}
              />
            </Row>
          </TouchableOpacity>
        )}

        {field.show_council && (
          <TouchableOpacity
            key={field.type + '-tehsil'}
            style={{
              flex: 1,
              backgroundColor: Theme.InputColorGreen,
              padding: 15,
              paddingLeft: 20,
              marginTop: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate('SearchableList', {
                data: this.state.councilList,
                onItemSelect: council => this.setState({council: council}),
              });
            }}>
            <Row>
              <Text
                style={{
                  color: this.state.council ? Theme.TextBlack : '#afafaf',
                  fontSize: 14,
                  flex: 1,
                  fontFamily: AvenirFont,
                }}>
                {this.state.loadingCouncil
                  ? 'Loading...'
                  : this.state.council
                  ? this.state.council.title
                  : 'Council'}
              </Text>
              <Icon
                name="down"
                type="AntDesign"
                style={{fontSize: 16, color: '#afafaf'}}
              />
            </Row>
          </TouchableOpacity>
        )}
      </>
    );
  }

  // obselete
  getDistricts() {
    this.api
      // .getAllDistricts()
      .getCommonData()
      .then(response => {
        const respData = getDataFrom(response);
        if (respData) {
          this.setState({districtsList: respData?.districts});
        }
        this.setState({isLoading: false});
      })
      .catch(error => {
        process(error);
        this.setState({isLoading: false});
      });
  }

  // getTehsil(districtId) {
  //   // const {districtsList} = this.state
  //   // if(districtsList?.length > 0){
  //   //   const dis = districtsList.find(district => district.id == districtId)
  //   //   return
  //   // }
  //   this.api
  //     .getTehsiles(districtId)
  //     .then(response => {
  //       const respData = getDataFrom(response);
  //       if (respData) {
  //         this.setState({tehsilsList: respData.tehsils});
  //       } else {
  //         this.setState({tehsilsList: []});
  //       }
  //       this.setState({loadingTehsil: false});
  //     })
  //     .catch(error => {
  //       process(error);
  //       this.setState({
  //         loadingTehsil: false,
  //         tehsilsList: [],
  //       });
  //     });
  // }

  getUCs(tehsilId) {
    this.api
      .getUCs(tehsilId)
      .then(response => {
        const respData = getDataFrom(response);
        if (respData) {
          this.setState({councilList: respData.union_councils});
        } else {
          this.setState({councilList: []});
        }
        this.setState({loadingCouncil: false});
      })
      .catch(error => {
        process(error);
        this.setState({
          loadingCouncil: false,
          councilList: [],
        });
      });
  }

  onSubmit() {
    const fields = this.formStructure;
    const complaintTypeId = this.params.id;
    const requestData = {
      complaint_type_id: complaintTypeId,
      // district_id: '', // changed below
      title: this.params.title,
      is_social_responsibility: this.state.is_social_responsibility,
    };

    let data = []; //{};
    let error = undefined;

    // const {selectedItems} = this.state;
    // CustomLog('selectedItems', data)
    if (this.selectedItems) {
      const itemsList = [];
      for (let i = 0; i < this.selectedItems.length; i++) {
        // const item = selectedItems[i]
        // if(item.currentPrice <= item.govt_price){
        //   itemDetail = item
        //   break;
        // }
        // itemsList.push({
        //   title: selectedItems[i].id.toString(),
        //   value: selectedItems[i].currentPrice,
        // });

        let obj = {
          title: this.selectedItems[i].id.toString(),
          // value: selectedItems[i].currentPrice,
          value: this.selectedItems[i].title,
        };
        if (
          complaintTypeId == Constant.OVER_PRICING_ID ||
          complaintTypeId == Constant.UNDER_PRICING_ID
        ) {
          obj.metadata = [
            {
              title: 'sales_price',
              value: this.selectedItems[i].currentPrice,
            },
            {
              title: 'govt_price',
              value: this.selectedItems[i].govt_price,
            },
            {
              title: 'govt_price_date',
              value: this.selectedItems[i].govt_price_date,
            },
          ];
        }
        itemsList.push(obj);
      }
      data = itemsList;
    }
    // CustomLog('data-1', data)

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      // CustomLog('field'+i, field)
      if (!field) {
        continue;
      }

      // CustomLog('field', field)
      if (
        field.type == InputType.RADIO_BUTTONS &&
        this.state[field.id] == undefined
      ) {
        // CustomLog('field-missed', field);
        // alert(field.name + ' is not set');
        error = 'Please select ' + field.name;
        break;
      } else if (
        // field.type != InputType.RADIO_BUTTONS &&
        field.type != InputType.DEMOGRAPHICS &&
        field.require &&
        this.state[field.id] == undefined
      ) {
        CustomLog('field', field);
        error =
          field.name && field.name.trim() != ''
            ? field.name + ' is required'
            : 'Please input all the required fields';
        break;
      } else if (field.type == InputType.DEMOGRAPHICS) {
        // CustomLog('_state', this.state[field.id])
        if (
          field.district_required == true &&
          this.state.district == undefined
        ) {
          error = 'Please select a district';
          break;
        } else if (
          field.tehsil_required == true &&
          this.state.tehsil == undefined
        ) {
          error = 'Please select a tehsile';
          break;
        } else if (
          field.council_required == true &&
          this.state.council == undefined
        ) {
          error = 'Please select UC/VC';
          break;
        }
      }
      switch (field.type) {
        case InputType.MAP:
          // data[field.id + '_lat'] = this.state[field.id + '_lat'];
          // data[field.id + '_lng'] = this.state[field.id + '_lng'];
          // data[field.id] = this.state[field.id];
          requestData[field.id] = this.state[field.id];
          requestData['latitude'] = this.state[field.id + '_lat'];
          requestData['longitude'] = this.state[field.id + '_lng'];
          requestData['location'] = this.state[field.id];
          requestData['address'] = this.state[field.id];
          break;

        case InputType.CHECK_BOXES:
          if (field.options.length == 1) {
            data.push({
              title: field.id,
              value: this.state[field.options[0].key],
            });
            // data[field.id] = this.state[field.options[0].key];
          } else {
            const _data = [];
            field.options.map(option => {
              // data.push({title: option.key, value: option.value});
              data.push({
                title: option.key,
                value: this.state[option.key]
                  ? this.state[option.key].toString()
                  : 'false',
              });
              // _data.push({[option.key]: option.value});
            });
            // data[field.id] = _data;
            // data.push({title: field.id, value: _data})
            // this.state[field.options[0].key];
          }
          break;

        case InputType.DROP_DOWN:
          // CustomLog('drop-down', field);
          // console.log('district', this.state.district)
          // because district is in main data
          if (field.is_district) {
            requestData.district_id = this.state[field.id].id;

            if (field.child && this.state[field.child.id]) {
              data.push({
                title: this.state[field.child.id].key
                  ? this.state[field.child.id].key
                  : this.state[field.child.id].id?.toString(),
                value: field.child.id, //this.state[field.id]?.id.toString(),
              });
            }
          } else {
            const val = this.state[field.id];
            data.push({
              title: val?.key ? val.key : val.id.toString(),
              value: field.id, //this.state[field.id]?.id.toString(),
            });

            // OLD METHOD
            // data.push({
            //   title: field.id,
            //   value: this.state[field.id]?.id.toString(),
            // });
            // requestData[field.id] = this.state[field.id]?.id;
          }
          break;

        case InputType.FILE:
          // console.log('drop-down', field)
          // console.log('district', this.state.district)
          // because district is in main data
          // requestData[field.id] = this.state[field.id];
          if (!requestData.attachments) {
            requestData.attachments = {};
          }
          requestData.attachments[field.id] = this.state[field.id];
          // requestData.attachments = this.state[field.id];
          break;

        case InputType.HEADING:
          // skip heading
          break;

        case InputType.DEMOGRAPHICS:
          // TODO: add district/tehsils here
          requestData.district_id =
            field.district_required == true
              ? this.state.district.id
              : undefined;
          requestData.tehsil_id =
            field.tehsil_required == true ? this.state.tehsil.id : undefined;
          requestData.union_council_id =
            field.council_required == true ? this.state.council.id : undefined;

          break;

        case InputType.MULTIPLE_SELECT:
          this.state[field.id]?.map(item => {
            data.push({
              title: item.id?.toString(),
              value: field.id, //this.state[field.id]?.map(item => item.id),
            });
          });
          // CustomLog('multiple-select', this.state[field.id]);
          // CustomLog('field', field);
          // CustomLog('data', data);
          // OLD METHOD
          // data.push({
          //   title: field.id,
          //   value: this.state[field.id]?.map(item => item.id),
          // });
          break;

        default:
          // data[field.id] = this.state[field.id];
          data.push({
            title: field.id?.toString(),
            value: this.state[field.id]?.toString(),
          });
          break;
      }
    }

    requestData.complaint_data = data;
    if (!requestData.district_id) {
      requestData.district_id = this.session.district_id;
    }

    CustomLog('data', requestData);
    if (error) {
      ShowToast(error);
      return;
      // } else {
      //   return;
    }

    // if (requestData) {
    //   ShowToast('Will send data in production mode');
    //   return;
    // }

    this.setState({isSaving: true});
    this.api
      .submitComplaint(requestData)
      .then(response => {
        const respData = getDataFrom(response);
        if (respData) {
          ShowAlert('Message', response.data.message);
          // this.props.navigation.goBack();
          // goto back screen
          this.props.navigation.pop(
            this.selectedItems
              ? 2 // if comming from options screen; then goback 2 screens
              : 1, // otherwise goback on step
          );
        }
        this.setState({
          isSaving: false,
        });
      })
      .catch(error => {
        process(error);
        this.setState({
          isSaving: false,
        });
      });
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
  },
  inputMask: {
    flex: 1,
    backgroundColor: Theme.InputColorGreen,
    padding: 10,
    paddingLeft: 20,
    marginTop: 15,
    fontFamily: AvenirFont,
    fontSize: 14,
    color: '#000',
  },
  label: {
    marginLeft: 10,
    textAlignVertical: 'center',
    // fontFamily: AvenirFont,
    // color: Theme.TextDark,

    fontSize: 14,
    color: Theme.TextGray,
    fontFamily: AvenirFont,
  },
  formHeading: {
    color: Theme.ColorPrimary,
    fontSize: 14,
    fontFamily: AvenirFont,
    marginTop: 30,
    marginBottom: 0,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default DynamicForm;
