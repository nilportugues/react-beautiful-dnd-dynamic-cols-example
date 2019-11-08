import React from 'react'
import styled from 'styled-components'
import Task from './task'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
`
const Title = styled.h3`
  padding: 0 8px;
`
const TaskList = styled.div`
  padding: 8px;
  margin: 8px !important;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'skyblue' : 'rgba(0,0,0,0.1)'};

  height: 38px;
  border: 1px dashed rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  height: 267.59999999999997px;

  & div div {
    position: relative;
    margin: 0 !important;
    display: inline-block;
    ${props => props.isDragging && 'margin-top: 0px !important;'}
  }
  & div {
    position: relative;
    display: inline-block;
    ${props =>
      props.isDragging && 'margin-bottom: -250px !important;'}
  }
`

const FirstCol = styled(`div`)`
  width: 50%;
  height: 512px;
  position: absolute;
  overflow: auto;
  left: 0;

  & div div {
    position: relative;
    margin: 0 !important;
    display: inline-block;
    margin-top: 0px !important;
  }
  & .videoContainer div {
    position: relative;
    display: inline-block;
    margin-bottom: -250px !important;
  }
`

const TaskItem = styled(Task)`
  border: 1px solid red;
  height: 267.59999999999997px;
  width: 157.2px;
`

export default class Column extends React.Component {
  render() {
    const ContainerElement = this.props.isFirst ? FirstCol : Container

    return (
      <ContainerElement>
        <Title>{this.props.column.title}</Title>
        <Droppable
          direction="horizontal"
          droppableId={this.props.column.id}
          type="TASK"
        >
          {(provided, snapshot) => (
            <TaskList
              className="videoContainer"
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDragging={snapshot.isDraggingOver}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </ContainerElement>
    )
  }
}
