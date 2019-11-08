import React from 'react'
import styled from 'styled-components'
import Task from './task'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'skyblue' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

const FirstCol = styled(`div`)`
  border: 2px solid black;
  width: 50%;
  height: 100vh;

  position: relative;
  float: left;
`

export default class Column extends React.Component {
  render() {
    const ContainerElement = this.props.isFirst ? FirstCol : Container

    return (
      <ContainerElement>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </ContainerElement>
    )
  }
}
