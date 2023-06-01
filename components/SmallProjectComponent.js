import React from "react";
import { TouchableOpacity, View, Text , StyleSheet} from "react-native";



export default SmallProjectComponent = props =>{
    //console.log(props.category)
return(
    <TouchableOpacity onPress = {props.onPress/*() =>console.log("Project " + props.id)*/}>
        <View style = {[styles.projectItem,{backgroundColor: props.colors.primary}]}>
            <Text style = {styles.headerText}> {props.name}</Text>
        </View>
    </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    projectItem:{
      minWidth: 100,
      borderRadius: 30,
      margin: 5,
      paddingVertical: 3,
      paddingHorizontal:15,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 5,
  },
  headerText:{
      color: 'white',
      paddingHorizontal: 6,
      paddingVertical: 10,
      fontSize: 17,
      fontWeight: 'bold',
  },
  }
  );
  