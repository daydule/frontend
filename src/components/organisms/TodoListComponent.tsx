import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { useReadScheduleQuery } from '@/redux/schedule/slice';
import { TodoCardComponent } from '@/components/molecules/TodoCardComponent';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useUpdateTodoPriorityMutation } from '@/redux/plan/slice';
import { Fragment, useEffect, useState } from 'react';
import { CreateScheduleButtonComponent } from '../molecules/CreateScheduleButtonComponent';
import { IconContext } from 'react-icons';
import { TbArrowBigUpLines } from 'react-icons/tb';
import { RegisterTodoComponent } from './RegisterTodoComponent';
import { ButtonComponent } from '../atoms/ButtonComponent';

export const TodoListComponent = () => {
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: formatToYYYY_MM_DD(new Date()) });
  const [updateTodoPriority] = useUpdateTodoPriorityMutation();
  const [todoOrder, setTodoOrder] = useState<number[]>([]);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  useEffect(() => {
    setTodoOrder(
      scheduleReadResult
        ? scheduleReadResult.todos
            .map((todo) => {
              return todo?.id;
            })
            .filter((id) => id !== null)
        : todoOrder,
    );
  }, [scheduleReadResult]);

  const handleToggleTodoArea = () => {
    setIsExpand((prevState: boolean) => !prevState);
  };

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
    try {
      updateTodoPriority({ ids: newTodoOrder });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='border border-gray-200 shadow-md rounded-md w-96 h-[calc(75%_-_2rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl px-2 rounded-lg bg-opacity-50 bg-white'>TODO一覧</div>
      <div className='absolute bottom-3 right-6 z-10'>
        <CreateScheduleButtonComponent />
      </div>
      {isExpand ? (
        <div className='absolute top-9 left-0 h-[calc(35%_-_1rem)] w-full z-10'>
          <RegisterTodoComponent handleToggleArea={handleToggleTodoArea} />
        </div>
      ) : (
        <div className='absolute top-12 h-[calc(10%_-_1rem)] inset-x-0 mx-auto w-[calc(100%_-_2rem)] z-10'>
          <ButtonComponent
            extraClassName='bg-white hover:bg-gray-300 text-gray-500'
            type='button'
            children='+ TODO登録'
            handleClick={handleToggleTodoArea}
          />
        </div>
      )}
      <div className={'absolute inset-0 flex justify-center items-center z-0' + (isExpand ? ' pt-28' : '')}>
        <IconContext.Provider
          value={{
            size: '18rem',
            className: 'text-gray-300 inset-0 z-0',
          }}
        >
          <TbArrowBigUpLines />
        </IconContext.Provider>
      </div>
      <div
        className={
          'absolute inset-x-0 overflow-auto z-0' +
          (isExpand ? ' top-52 bottom-10  h-[calc(55%_-_2rem)]' : ' top-24 inset-y-0  h-[70%]')
        }
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='todoList'>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todoOrder?.map((id, index) => {
                  const todo = scheduleReadResult?.todos.find((todo) => todo?.id === id);
                  if (!todo) return <Fragment key={'todoCard' + index}></Fragment>;
                  return (
                    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TodoCardComponent todo={todo} isDragging={snapshot.isDragging} />
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
