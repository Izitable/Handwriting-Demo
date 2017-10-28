import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Slider,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
} from "react-native";
import { getWritings, getRender } from "./src/api/handwriting";
import ColorItem from "./src/components/ColorItem/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: "000000",
      handwritingSize: 100,
      selectedHandwriting: null,
      handwritings: [],
      colors: [
        { text: "Black", rgb: "000000" },
        { text: "Blue", rgb: "0000ff" },
        { text: "Green", rgb: "008000" },
        { text: "Red", rgb: "ff0000" },
        { text: "Yellow", rgb: "ffff00" }
      ],
      image: null,
      renderText: "",
      render: null
    };
  }

  componentDidMount() {
    var promise = getWritings();
    promise
      .then(val =>
        this.setState({
          handwritings: val.data,
          selectedHandwriting: val.data[0].id
        })
      )
      .catch(error => alert(error));
  }

  encodeBinary = binary => {
    return btoa(
      new Uint8Array(binary).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  };

  getImage = () => {
    if (this.state.renderText == "") {
      alert("Text field is empty");
    } else {
      Keyboard.dismiss();
      var renderPromise = getRender(
        this.state.selectedHandwriting,
        this.state.renderText,
        this.state.handwritingSize,
        this.state.selectedColor
      );

      renderPromise
        .then(item =>
          this.setState({
            render: "data:image/png;base64," + this.encodeBinary(item.data)
          })
        )
        .catch(error => alert("Error getting image"));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#001064" barStyle="light-content" />
        <View style={styles.toolbar}>
          <View style={styles.simpleFlex} />
          <View style={styles.toolbarTextContainer}>
            <Text style={styles.toolbarText}>Handwriting Demo</Text>
          </View>
        </View>
        <ScrollView style={{ paddingTop: 8 }}>
          <View style={styles.formContainer}>
            <View style={styles.simpleFlex} />
            <View style={styles.centerContainer}>
              <Text style={styles.formHeadline}>Text:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Your text here"
                onChangeText={renderText => this.setState({ renderText })}
                value={this.state.renderText}
                underlineColorAndroid={"#283593"}
              />
            </View>
            <View style={styles.simpleFlex} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.simpleFlex} />
            <View style={styles.centerContainer}>
              <Text style={styles.formHeadline}>Handwriting:</Text>
              <Picker
                mode="dropdown"
                selectedValue={this.state.selectedHandwriting}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ selectedHandwriting: itemValue })}
              >
                {this.state.handwritings.map(item => (
                  <Picker.Item
                    key={item.id}
                    label={item.title}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.simpleFlex} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.simpleFlex} />
            <View style={styles.centerContainer}>
              <Text style={styles.formHeadline}>Size:</Text>
              <View style={styles.sliderContainer}>
                <Text>{this.state.handwritingSize}px</Text>
                <Slider
                  style={styles.simpleFlex}
                  value={this.state.handwritingSize}
                  onValueChange={val => this.setState({ handwritingSize: val })}
                  minimumValue={100}
                  maximumValue={200}
                  step={2}
                />
              </View>
            </View>
            <View style={styles.simpleFlex} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.simpleFlex} />
            <View style={styles.centerContainer}>
              <Text style={styles.formHeadline}>Color:</Text>
              <View style={styles.colorItems}>
                {this.state.colors.map(item => (
                  <ColorItem
                    key={item.rgb}
                    selected={item.rgb == this.state.selectedColor}
                    color={item.rgb}
                    selectColor={() =>
                      this.setState({ selectedColor: item.rgb })}
                  />
                ))}
              </View>
            </View>
            <View style={styles.simpleFlex} />
          </View>
        </ScrollView>
        <View style={{ flex: 4 }}>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{ flex: 1, width: "90%" }}
              resizeMode="cover"
              source={{ uri: this.state.render }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.simpleFlex} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.getImage()}
            >
              <Text style={styles.buttonText}>Get Handwriting</Text>
            </TouchableOpacity>
            <View style={styles.simpleFlex} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column"
  },
  toolbar: {
    height: 64,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    elevation: 5,
    backgroundColor: "#283593"
  },
  simpleFlex: { flex: 1 },
  toolbarTextContainer: { flex: 7, justifyContent: "center" },
  toolbarText: { fontWeight: "bold", color: "white", fontSize: 22 },
  centerContainer: {
    flex: 6,
    justifyContent: "center"
  },
  formHeadline: {
    fontSize: 22
  },
  formContainer: {
    flex: 1,
    flexDirection: "row"
  },
  sliderContainer: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8
  },
  textInput: { height: 40 },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16
  },
  button: {
    flex: 6,
    backgroundColor: "#5f5fc4",
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5
  },
  buttonText: { fontSize: 18, color: "white" },
  colorItems: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});
