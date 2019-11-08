import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Column from './column'

const Container = styled.div`
  width: 100%;
  background: yellow;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      removeElementFromFirstCol: false,
      tasks: {
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' }
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'To do',
          taskIds: ['task-2', 'task-3', 'task-4']
        },
        'column-2': {
          id: 'column-2',
          title: 'Video 1',
          taskIds: []
        }
      },
      // Facilitate reordering of the columns
      columnOrder: ['column-1', 'column-2']
    }
  }
  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <>
        <button
          onClick={() => {
            const realTotal = Object.keys(this.state.columns).length
            const total = Object.keys(this.state.columns).length + 1
            const colName = 'column-' + total

            const newVideoRow = {
              id: colName,
              title: 'Video ' + realTotal,
              taskIds: []
            }

            let newColumns = { ...this.state.columns }
            newColumns[colName] = newVideoRow

            let newColumnOrder = [...this.state.columnOrder]
            newColumnOrder.push(colName)

            this.setState({
              columns: newColumns,
              columnOrder: newColumnOrder
            })
          }}
        >
          Add Video
        </button>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            {this.state.columnOrder.map((columnId, i) => {
              const column = this.state.columns[columnId]
              const tasks = column.taskIds.map(
                taskId => this.state.tasks[taskId]
              )

              let Wrapper = React.Fragment
              if (i > 0) {
                Wrapper = styled(`div`)`
                  border: 1px solid red;
                  display: list-item;
                  width: 50%;
                  height: 256px;
                  position: relative;
                  float: right;
                `
              }

              return (
                <Wrapper>
                  <Column
                    key={column.id}
                    isFirst={column.id === 'column-1'}
                    column={column}
                    tasks={tasks}
                  />
                </Wrapper>
              )
            })}
          </Container>
        </DragDropContext>
      </>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
