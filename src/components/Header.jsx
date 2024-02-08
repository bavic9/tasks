import React, { useState } from 'react'
import logo from '../assets/logo-mobile.svg'
import iconDown from '../assets/icon-chevron-down.svg'
import iconUp from '../assets/icon-chevron-up.svg'
import elipsis from '../assets/icon-vertical-ellipsis.svg'
import HeaderDropdown from './HeaderDropdown'
import AddEditBoardModal from '../modals/AddEditBoardModal'
import { useDispatch, useSelector } from 'react-redux'
import AddEditTaskModal from '../modals/AddEditTaskModal'
import ElipsisMenu from './ElipsisMenu'
import DeleteModal from '../modals/DeleteModal'
import boardsSlice from '../redux/boardsSlice'

function Header({setBoardModalOpen, boardModalOpen}) {

  const dispatch = useDispatch()

  const [openDropdown, setOpenDropdown] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [openAddEditTask, setOpenAddEditTask] = useState(false)
  const [isElipsisOpen, setIsElipsisOpen] = useState(false)
  const [boadType, setBoadType] = useState('add')

  const boards = useSelector( (state) => state.boards)
  const board = boards.find(board => board.isActive)


  const setOpenEditModal = () => {
    setBoardModalOpen(true)
    setIsElipsisOpen(false)
  }

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setIsElipsisOpen(false)
  }

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard())
    dispatch(boardsSlice.actions.setBoardActive({index : 0}))
    setIsDeleteModalOpen(false)
  }

  const onDropdownClick = () => {
    setOpenDropdown (state => !state)
    setIsElipsisOpen(false)
    setBoadType('add')
  }

  return (
    <div className='p-4 fixed absolute left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'>
      <header className='flex justify-between dark:text-white items-center'>
        <div className='flex items-center space-x-2 md:space-x-4'>
            <img src={logo} alt="" className='h-6 w-6'/>
            <h3 className='hidden md:inline-block font-bold font-sans md:text-4xl'>
              Tasks
            </h3>
            <div className='flex items-center '>
              <h3 className='truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans'>
                {board.name}
              </h3>
              <img src={openDropdown ? iconUp : iconDown} alt="dropdown icon" className='w-3 ml-2 cursor-pointer md:hidden'
              onClick={onDropdownClick}
              />
            </div>
        </div>

        <div className='flex space-x-4 items-center md:space-x-6'>
          <button
          onClick={
            () => {
              setOpenAddEditTask(state => !state)
            }
          }
          className='hidden md:block button'>
            + Add New Task
          </button>
          <button
          onClick={
            () => {
              setOpenAddEditTask(state => !state)
            }
          }
          className='button py-1 px-3 text-xl md:hidden'>
            +
          </button>
          <img src={elipsis} alt="elipsis" className='cursor-pointer h-6'
          onClick={() => {
            setBoadType('edit')
            setOpenDropdown(false)
            setIsElipsisOpen(state => !state)
          }}
          />

          {
            isElipsisOpen && <ElipsisMenu 
            setOpenDeleteModal={setOpenDeleteModal}
            setOpenEditModal={setOpenEditModal}
            type='Boards'/>
          }
        </div>

      </header>


      {openDropdown && <HeaderDropdown setBoardModalOpen = {setBoardModalOpen} setOpenDropdown={setOpenDropdown}/>}

      {
        boardModalOpen && <AddEditBoardModal type={boadType  }  setBoardModalOpen = {setBoardModalOpen}/>
      }

      {
        openAddEditTask && <AddEditTaskModal setOpenAddEditTask = {setOpenAddEditTask} device='mobile' type='add'/>
      }

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}

    </div>
  )
}

export default Header               
