import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import api from '../services/api'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

export default class New extends Component {
    
    static navigationOptions = {
        headerTitle: 'New Post'
    }

    state = {
        author: '',
        place: '',
        description: '',
        hastags: '',
        preview: null
    }

    componentDidMount() {
        this.getPermissionAsync()
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
            if (status !== 'granted') {
                alert('Access required to continue. Sorry.')
            }
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        })
        if (!result.cancelled) {
            this.setState({ preview: result })
        }
    }

    takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            base64: true
        })
        if (!result.cancelled) {
            this.setState({ preview: result })
        }
    }

    handleShare = async() => {
        if (this.state.preview) {
            var nameArr = this.state.preview.uri.split('/');
            const image = {
                uri: this.state.preview.uri,
                type: this.state.preview.type,
                name: nameArr[nameArr.length - 1]
            }
            
            const data = new FormData()
            data.append('image', image)
            data.append('author', this.state.author)
            data.append('place', this.state.place)
            data.append('description', this.state.description)
            data.append('hashtags', this.state.hashtags)

            api.post('posts', data)
            this.props.navigation.navigate('Feed')
        }
    }
    
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <TouchableOpacity style={styles.selectButton} onPress={this.takePhoto}>
                    <Text style={styles.selectButtonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectButton} onPress={this.pickImage}>
                    <Text style={styles.selectButtonText}>Select from Gallery</Text>
                </TouchableOpacity>

                { this.state.preview && 
                    <Image source={{ uri: this.state.preview.uri }} style={styles.preview} /> }

                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder='Author'
                    placeholderTextColor='#999'
                    value={this.state.author}
                    onChangeText={author => this.setState({author})}/>

                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder='Place'
                    placeholderTextColor='#999'
                    value={this.state.place}
                    onChangeText={place => this.setState({place})}/>

                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder='Description'
                    placeholderTextColor='#999'
                    value={this.state.description}
                    onChangeText={description => this.setState({description})}/>

                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder='Hashtags'
                    placeholderTextColor='#999'
                    value={this.state.hashtags}
                    onChangeText={hashtags => this.setState({hashtags})}/>

                { this.state.preview && 
                    <TouchableOpacity style={styles.shareButton} onPress={this.handleShare}>
                        <Text style={styles.shareButtonText}>Share</Text>
                    </TouchableOpacity> }

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30
    },

    selectButton: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CCC',
        borderStyle: 'dashed',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    selectButtonText: {
        fontSize: 16,
        color: '#666'
    },

    preview: {
        width: 100,
        height: 100,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 4
    },

    input: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginTop: 10,
        fontSize: 16
    },

    shareButton: {
        backgroundColor: '#6D3428',
        borderRadius: 4,
        height: 42,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    shareButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    }
})