import React, {Component} from 'react'
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import commonStyles from '../styles/commonStyles'

const initialState = {
     desc: '',
     date: new Date(),
    }

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    getDateTimePicker = () => {
        return <DateTimePicker value={this.state.date} mode='date' onChange={(_, date) => this.setState({ date })}/>
    }

    render() {
        return(
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='fade'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova tarefa</Text>
                    <TextInput style={styles.textInput} placeholder='Informe a descrição' value={this.state.desc} onChangeText={desc => this.setState({ desc })}/>
                    {this.getDateTimePicker()}
                    <View style={styles.buttonArea}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.buttonDanger}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.buttonPrimary}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.primary,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 20
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonPrimary: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.primary
    },
    buttonDanger: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.danger
    },
    textInput: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 6,
    },
})