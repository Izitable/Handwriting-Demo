import React from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default class ColorItem extends React.Component {
  render() {
    var { color, selected, selectColor } = this.props;
    return (
      <TouchableOpacity
        onPress={() => selectColor()}
        style={[
          {
            width: selected ? 40 : 25,
            height: selected ? 40 : 25,
            backgroundColor: "#" + color,
            borderWidth: selected ? 2 : 1
          },
          styles.colorItem
        ]}
      />
    );
  }
}
