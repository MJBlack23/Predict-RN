import React from 'react'
import { View, KeyboardAvoidingView, AsyncStorage, Image } from 'react-native'

import styles from '../styles/'

import BrandHeader from '../components/common/BrandHeader'
import SubHeader from '../components/common/SubHeader'
import Input from '../components/common/Input'
import TouchableButton from '../components/common/TouchableButton'

import { updateUserValue } from '../util/firebase'

export default class Profile extends React.Component {
  static defaultProfileImage = 'http://www.sbcs.edu.tt/wp-content/uploads/2016/04/profile-default.png'

  state = {
    email: '',
    uid: '',
    displayName: '',
    profileImage: '',
  }

  componentDidMount() {
    AsyncStorage.getItem('user')
      .then(JSON.parse)
      .then(user => {
        this.setState(() => ({
          ...this.state,
          email: user.email,
          uid: user.uid,
          displayName: user.displayName
        }))
      })
  }

  handleInputChange = key => text => {
    this.setState(() => ({
      ...this.state,
      [key]: text
    }))
  }

  handleUpdateProfile = async () => {
    try {
      const { uid, displayName, profileImage } = this.state
      await updateUserValue(uid, { displayName, profileImage })
    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    const uri = this.state.profileImage.length > 0 ? this.state.profileImage : Profile.defaultProfileImage

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='height'
        enabled
      >
        <BrandHeader />

        <SubHeader text='Profile' />

        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri }}
          />
        </View>

        <Input
          label='Profile Image URL'
          value={this.state.profileImage}
          onChange={this.handleInputChange('profileImage')}
        />

        <Input
          label='Name'
          value={this.state.displayName}
          onChange={this.handleInputChange('displayName')}
        />

        <TouchableButton
          label='Save Profile'
          onPress={this.handleUpdateProfile}
        />
      </KeyboardAvoidingView>
    )
  }
}
