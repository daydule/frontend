import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { useReadScheduleQuery } from '@/redux/schedule/slice';
import { TodoCardComponent } from '@/components/molecules/TodoCardComponent';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useUpdateTodoPriorityMutation } from '@/redux/plan/slice';
import { Fragment, useEffect, useState } from 'react';

export const TodoListComponent = () => {
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: formatToYYYY_MM_DD(new Date()) });
  const [updateTodoPriority] = useUpdateTodoPriorityMutation();
  const [todoOrder, setTodoOrder] = useState<number[]>([]);

  useEffect(() => {
    setTodoOrder(
      scheduleReadResult
        ? scheduleReadResult.todos
            .map((todo) => {
              console.log(todo);
              return todo?.id;
            })
            .filter((id) => id !== null)
        : todoOrder,
    );
  }, [scheduleReadResult]);

  const reorder = (list: number[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !scheduleReadResult) return;

    const newTodoOrder = reorder(todoOrder, result.source.index, result.destination.index);
    setTodoOrder(newTodoOrder);
    updateTodoPriority({ ids: newTodoOrder });
  };

  return (
    <div className='border border-gray-200 shadow-md rounded-md w-96 h-[calc(50%_-_2rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl px-2 rounded-lg bg-opacity-50 bg-white'>TODO一覧</div>
      <div className='overflow-auto h-full pt-12'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='todoList'>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todoOrder?.map((id, index) => {
                  const todo = scheduleReadResult?.todos.filter((todo) => todo?.id === id)[0];
                  if (!todo) return <Fragment key={'todoCard' + index}></Fragment>;
                  return (
                    <Draggable key={todo?.id} draggableId={todo?.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TodoCardComponent
                            todo={todo}
                            isDragging={snapshot.isDragging}
                            draggableStyle={provided.draggableProps.style}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
