//Imports basicos
import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, Platform, TouchableOpacity } from 'react-native'

//Importando componentes
import Task from "../components/Task"
import ModalAddTask from "./ModalAddTask"

//Importando imagens
import todayImage from '../../assets/assets/imgs/today.jpg'

//Common Styles
import commonStyles from '../styles/commonStyles'

//Moment library
import moment from 'moment'
import 'moment/locale/pt-br'

//Icons library
import Icon from 'react-native-vector-icons/FontAwesome'

export default class TaskList extends Component {

    //O state armazena o status das tarefas
    state = {
        showDoneTasks: true,
        showModalAddTask: false,
        visibleTasks: [],
        tasks: [
            {
                id: Math.random(),
                desc: 'Comprar livro',
                estimatedAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Ler livro',
                estimatedAt: new Date(),
                doneAt: null,
            },
        ]
    }

    /*
    Função que controla o status da tarefa pelo click do botão
    Essa função é passada para o component Task através das props
    Já no component task a função é chamada passando a propriedade 'taskId' assim o state é alterado
    */

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks }, this.filterTasks)
    }

    /*
    Função que controla se é pra exibir ou não tarefas concluídas
    Essa função inverte o status de showDoneTasks
    A função possui um callback no setState, ou seja, assim que o state
    for alterado irá chamar a função this.filterTasks()
    */

    toggleFilter = () => {
        this.setState({ showDoneTasks : !this.state.showDoneTasks }, this.filterTasks)
    }

    /*
    Função que controla quais tasks serão exibidas na tela com base
    state showDoneTasks
    */

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks }) //
    }

    /*
    Funções de ciclo de vida
    */

    componentDidMount = () => {
        this.filterTasks()
    }

    /*
    Função render é responsável para renderizar a tela
    */

    render() {

        //Retorna a data de hoje
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM [de] Y')

        return (
            <View style={styles.container}>
                <ModalAddTask isVisible={this.state.showModalAddTask} onCancel={() => this.setState({ showModalAddTask : false})}/>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks} 
                    keyExtractor={item => `${item.id}`}
                    renderItem={(obj) => <Task {...obj.item} toggleTask={this.toggleTask}/>}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => this.setState({ showModalAddTask : true})} activeOpacity={0.7}>
                    <Icon name="plus" size={20} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
        )
    }
}

//Folha de estilos
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: '#FFF',
        marginLeft: 20,
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: '#FFF',
        marginLeft: 20,
        marginBottom: 20,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS == 'ios' ? 40 : 20
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    }
})