import { Fragment, useEffect, useState, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { IconContext } from 'react-icons';
import { TbArrowBigUpLines } from 'react-icons/tb';
import { ButtonComponent } from '../atoms/ButtonComponent';
import { CreateScheduleButtonComponent } from '../molecules/CreateScheduleButtonComponent';
import { RegisterTodoComponent } from './RegisterTodoComponent';
import { TodoCardComponent } from '@/components/molecules/TodoCardComponent';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { useUpdateTodoPriorityMutation } from '@/redux/plan/slice';
import { useReadScheduleQuery } from '@/redux/schedule/slice';

type Props = {
  children: React.ReactNode;
  onOutsideClick: () => void;
};

const OutsideClickHandler = ({ children, onOutsideClick }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export const TodoListComponent = () => {
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: formatToYYYY_MM_DD(new Date()) });
  const [updateTodoPriority] = useUpdateTodoPriorityMutation();
  const [todoOrder, setTodoOrder] = useState<number[]>([]);
  const [showsModal, setShowsModal] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  useEffect(() => {
    setTodoOrder(
      scheduleReadResult
        ? scheduleReadResult.todos
            .map((todo) => {
              return todo?.id;
            })
            .filter((id) => id !== null)
        : [],
    );
  }, [scheduleReadResult]);

  const handleShowsModal = (showsTodoModal: boolean) => {
    setShowsModal(showsTodoModal);
  };

  const handleToggleTodoArea = () => {
    !showsModal && setIsExpand((prevState: boolean) => !prevState);
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
    <div className='relative my-4 h-[calc(75%_-_2rem)] w-96 rounded-md border border-gray-200 shadow-md'>
      <div className='absolute left-3 top-3 rounded-lg bg-white px-2 text-xl'>TODO一覧</div>
      <div className='absolute bottom-3 right-6 z-10'>
        <CreateScheduleButtonComponent />
      </div>
      {isExpand ? (
        <OutsideClickHandler onOutsideClick={handleToggleTodoArea}>
          <div className='absolute inset-0 top-9 z-10 h-48'>
            <RegisterTodoComponent showsModal={showsModal} handleShowsModal={handleShowsModal} />
          </div>
        </OutsideClickHandler>
      ) : (
        <div className='absolute inset-x-0 top-12 z-10 mx-auto h-[calc(10%_-_1rem)] w-[calc(100%_-_2rem)]'>
          <ButtonComponent
            extraClassName='bg-white hover:bg-gray-300 text-gray-500'
            type='button'
            children='+ TODO登録'
            handleClick={handleToggleTodoArea}
          />
        </div>
      )}
      <div className={'absolute inset-0 flex justify-center items-center z-0' + (isExpand ? ' top-64' : '')}>
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
          (isExpand ? ' top-60 bottom-10  h-[calc(55%_-_2rem)]' : ' top-24 inset-y-0  h-[70%]')
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
