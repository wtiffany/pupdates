// TODO:
// show dog's owner avatar & name, click to view owner's profile
// add message button that creates a new chat room or takes to exisiting chat room
// styling

import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';



class likedDogProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      picture: ""
    };
  }

  componentDidMount = () => {
    this.getOwnersInfo();
  };

  getOwnersInfo = () => {
    axios.get('http://localhost:8000/api/userid/' + this.props.navigation.state.params.owner)
      .then(({ data }) => {
        console.log(data)
        this.setState({ name: data[0].name, picture: data[0].picture }, () => {
          // console.log("this.state.owner: ", this.state.owner); // [{owner}]
          // console.log("this.state.owner[0]: ", this.state.owner[0]); // {owner}
          // console.log("this.state.owner[0].name: ", this.state.owner[0].name); // Ironman
          
        });
      })
      .catch((err) => {
        console.log('failed to get owner info: ', err)
      });
  };

  render() {
    return (
      <View>
        <Avatar
          xlarge
          rounded
          source={{uri: this.props.navigation.state.params.pictures[0]}}
        />
        <View>
        <Text>
          Name: {this.props.navigation.state.params.name}
        </Text>
        <Text>
          Breed: {this.props.navigation.state.params.breed}
        </Text>
        <Text>
          Gender: {this.props.navigation.state.params.gender}
        </Text>
        <Text>
          Age: {this.props.navigation.state.params.age}
        </Text>
        <Text>
          Location: {this.props.navigation.state.params.location}
        </Text>
        <Text>
          Bio: {this.props.navigation.state.params.bio}
        </Text>
        <Avatar
          large
          rounded
          source={{uri: this.state.picture}}
        />
        <Text>
          Owner: {this.state.name}
        </Text> 
        <Button
          raised
          small
          iconRight={{
            name: 'message' 
          }}
          title='Chat'
        />
      </View>
    </View>
    )
  }
}

var styles = StyleSheet.create({
  image: {
    height: 150,
    borderRadius: 75,
    width: 150,
  }
});

export default likedDogProfile;