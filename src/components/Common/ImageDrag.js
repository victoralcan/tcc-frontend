import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (draggableStyle) => ({
  userSelect: 'none',
  margin: `0 ${grid}px 0 0`,

  ...draggableStyle,
});

const getListStyle = (itemsLength) => ({
  border: '2px solid rgba(0, 0, 0, 0.05)',
  display: 'flex',
  padding: grid,
  width: '100%',
});

class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.images,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setState({
        items: this.props.images,
      });
    }
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
    this.props.handleChangeImagesOrder(items);
  }
  render() {
    return (
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(this.state.items.length)}
                {...provided.droppableProps}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(provided.draggableProps.style)}
                      >
                        <div className="product-img mr-4">
                          <div className="product-delete">
                            <Link
                              to="#"
                              onClick={() => this.props.handleRemoveImage(item)}
                            >
                              <i className="mdi mdi-delete"></i>
                            </Link>
                          </div>
                          <img
                            height="300"
                            src={item}
                            className="avatar-lg rounded bg-light"
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default DragDrop;
