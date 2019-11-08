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
  margin: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'skyblue' : 'rgba(0,0,0,0.1)'};
  flex-grow: 1;
  height: 38px;
  border: 1px dashed rgba(0, 0, 0, 0.3);
  border-radius: 6px;
`

const FirstCol = styled(`div`)`
  width: 50%;
  height: 512px;
  position: absolute;
  overflow: auto;
  left: 0;

  & .videoContainer {
    height: auto;
  }
`

const TaskItem = styled(Task)`
  width: 192px;
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
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <div
                  style={{ display: 'inline-block', width: '196px' }}
                >
                  <TaskItem key={task.id} task={task} index={index} />
                </div>
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </ContainerElement>
    )
  }
}
