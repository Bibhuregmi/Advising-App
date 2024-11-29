import React, { useRef, useState } from 'react'
import { View, 
        Text,
        TouchableOpacity, 
        Dimensions, 
        FlatList, 
        StyleSheet 
    } from 'react-native'


const screenHeight = Dimensions.get('window').height;

const Dropdown = ({ items, selectedValues, onSelect, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [dropdownPosition, setDropdownPosition] = useState({top:0, left:0});
    const buttonRef = useRef(null);

    const handleToggleDropdown = () => {
        if (!isOpen) {
            buttonRef.current.measure((fx,fy,width,height,px,py) => {
                setDropdownPosition({top: py + height, left: px});
            });
        }
        setIsOpen(!isOpen);
    }
    const handleSelect = (item) => {
        onSelect(item);
        setIsOpen(false); 
    };
  return (
    <View style = {styles.container}> 
      <TouchableOpacity
        ref = {buttonRef}
        style = {styles.button}
        onPress={handleToggleDropdown}
      >
        <Text style={styles.buttonText}>{selectedValues}</Text>
      </TouchableOpacity>
      {isOpen &&(
        <View
        styles = {[
            styles.dropdownContainer,
            {
                top: dropdownPosition.top,
                left: dropdownPosition.left, 
                maxHeight: screenHeight - dropdownPosition.top -20, 
            },
        ]}
        >           
        <FlatList
            data = {items}
            renderItem={({item}) => (
                <TouchableOpacity
                    style = {styles.option}
                    onPress={() => handleSelect(item.value)}
                >
                    <Text style= {styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
        />
        </View>
           
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 20,
    },
    button:{
        padding: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize:16,
        color: '#333',
    },
    dropdownContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10, 
    },
    option: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
      optionText: {
        fontSize: 16,
        color: '#333',
    },
})
export default Dropdown