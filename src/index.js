import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Column from './column'

const Container = styled.div`
  width: 100%;
  background: yellow;
  overflow: auto;
  max-height: 512px;
  width: 50%;
  float: right;
`

const VideoItemWrapper = styled(`div`)`
  display: list-item;
  list-style: none;
  width: 100%;
  position: relative;
  float: right;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    const tasks = {
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-41': { id: 'task-41', content: 'Cook dinner' },
      'task-42': { id: 'task-42', content: 'Cook dinner' },
      'task-43': { id: 'task-43', content: 'Cook dinner' },
      'task-44': { id: 'task-44', content: 'Cook dinner' },
      'task-45': { id: 'task-45', content: 'Cook dinner' },
      'task-46': { id: 'task-46', content: 'Cook dinner' },
      'task-47': { id: 'task-47', content: 'Cook dinner' },
      'task-48': { id: 'task-48', content: 'Cook dinner' },
      'task-49': { id: 'task-49', content: 'Cook dinner' },
      'task-50': { id: 'task-50', content: 'Cook dinner' },
      'task-51': { id: 'task-51', content: 'Cook dinner' },
      'task-52': { id: 'task-52', content: 'Cook dinner' },
      'task-53': { id: 'task-53', content: 'Cook dinner' },
      'task-54': { id: 'task-54', content: 'Cook dinner' },
      'task-55': { id: 'task-55', content: 'Cook dinner' },
      'task-56': { id: 'task-56', content: 'Cook dinner' },
      'task-57': { id: 'task-57', content: 'Cook dinner' },
      'task-58': { id: 'task-58', content: 'Cook dinner' },
      'task-59': { id: 'task-59', content: 'Cook dinner' },
      'task-60': { id: 'task-60', content: 'Cook dinner' },
      'task-61': { id: 'task-61', content: 'Cook dinner' },
      'task-62': { id: 'task-62', content: 'Cook dinner' },
      'task-63': { id: 'task-63', content: 'Cook dinner' },
      'task-64': { id: 'task-64', content: 'Cook dinner' },
      'task-65': { id: 'task-65', content: 'Cook dinner' },
      'task-66': { id: 'task-66', content: 'Cook dinner' },
      'task-67': { id: 'task-67', content: 'Cook dinner' },
      'task-68': { id: 'task-68', content: 'Cook dinner' },
      'task-69': { id: 'task-69', content: 'Cook dinner' },
      'task-70': { id: 'task-70', content: 'Cook dinner' },
      'task-71': { id: 'task-71', content: 'Cook dinner' },
      'task-72': { id: 'task-72', content: 'Cook dinner' },
      'task-73': { id: 'task-73', content: 'Cook dinner' },
      'task-74': { id: 'task-74', content: 'Cook dinner' },
      'task-75': { id: 'task-75', content: 'Cook dinner' },
      'task-76': { id: 'task-76', content: 'Cook dinner' }
    }

    this.state = {
      removeElementFromFirstCol: false,
      tasks: tasks,
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'To do',
          taskIds: [...Object.keys(tasks)]
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

        <div
          style={{
            overflow: 'auto',
            border: '2px solid red'
          }}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Container>
              {this.state.columnOrder.map((columnId, i) => {
                const column = this.state.columns[columnId]
                const tasks = column.taskIds.map(
                  taskId => this.state.tasks[taskId]
                )

                let Wrapper = React.Fragment
                if (i > 0) {
                  Wrapper = VideoItemWrapper
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
        </div>
      </>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
