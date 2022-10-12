import React, {Fragment} from 'react';
import {Modal, StyleSheet, View, Text, Pressable} from 'react-native';
import {colors} from '../../utils/constants';
import UIButton from './UIButton';

interface UIModalProperties {
  child?: React.ReactNode;
  onRequestClose?: () => void;
  onPressSubmitModal?: () => void;
  onPressHideModal?: () => void;
  modalText?: string;
  submitText?: string;
  closeIconVisible?: boolean;
  modalVisible: boolean;
}

const UIModal: React.FC<UIModalProperties> = ({
  child,
  onRequestClose,
  onPressSubmitModal,
  onPressHideModal,
  modalText,
  submitText,
  closeIconVisible,
  modalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {closeIconVisible && (
            <UIButton
              iconName="window-close"
              iconColor={colors.primary}
              backgroundColor={colors.transparent}
              onPress={onPressHideModal}
              style={{
                width: 40,
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            />
          )}
          {child == null && (
            <Fragment>
              <Text style={styles.modalText}>{modalText}</Text>
              <Pressable
                style={styles.buttonClose}
                onPress={onPressSubmitModal}>
                <Text style={styles.textStyle}>{submitText}</Text>
              </Pressable>
            </Fragment>
          )}
          {child != null && child}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default UIModal;
