import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {colors} from '../../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SelectDropdownProperties {
  data: string[];
  onSelect?: (selectedItem: any, index: number) => void;
  buttonTextAfterSelection?: (selectedItem: any, index: number) => string;
  rowTextForSelection?: (item: any, index: number) => string;
  defaultValue?: string;
  iconColor?: string;
  iconName?: string;
  dropdownIconPosition?: 'left' | 'right' | undefined;
}

const UISelectDropdown: React.FC<SelectDropdownProperties> = ({
  data,
  onSelect,
  buttonTextAfterSelection,
  rowTextForSelection,
  defaultValue,
  iconColor,
  dropdownIconPosition,
}) => {
  const defaultOnSelect = (selectedItem: any, index: number) => {
    console.log(selectedItem, index);
  };
  const defaultButtonTextAfterSelection = (selectedItem: any) => {
    // text represented after item is selected
    // if data array is an array of objects then return selectedItem.property to render after item is selected
    return selectedItem;
  };
  const defaultRowTextForSelection = (item: any) => {
    // text represented for each item in dropdown
    // if data array is an array of objects then return item.property to represent item in dropdown
    return item;
  };
  const renderSelectDropdownIcon = () => {
    return (
      <Icon
        size={30}
        name={'caret-down'}
        style={{
          color: iconColor == null ? colors.black : iconColor,
        }}
      />
    );
  };

  return (
    <SelectDropdown
      data={data}
      buttonStyle={styles.buttonStyle}
      rowStyle={styles.rowStyle}
      defaultValue={defaultValue}
      onSelect={onSelect ?? defaultOnSelect}
      renderDropdownIcon={renderSelectDropdownIcon}
      dropdownIconPosition={dropdownIconPosition ?? 'left'}
      buttonTextAfterSelection={
        buttonTextAfterSelection ?? defaultButtonTextAfterSelection
      }
      rowTextForSelection={rowTextForSelection ?? defaultRowTextForSelection}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.lightTeal,
    borderRadius: 10,
    width: 150,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  rowStyle: {
    backgroundColor: colors.lightGreen,
  },
});

export default UISelectDropdown;
