import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import boardsSlice from '../redux/boardsSlice'
import useDarkMode from '../Hooks/useDarkMode'
import boardIcon from '../assets/icon-board.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import darkIcon from '../assets/icon-dark-theme.svg'
import { Switch } from '@headlessui/react'
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import AddEditBoardModal from '../modals/AddEditBoardModal'

function SideBar({setIsSideBarOpen, isSideBarOpen}) {
  const dispatch = useDispatch()
  const [colorTheme, setTheme] = useDarkMode()
  const [darkSide, setDarkSide] = useState(
      colorTheme === 'light' ? true : false
  )

  const toggleDarkMode = (checked) => {
      setTheme(colorTheme)
      setDarkSide(checked)
  }

  const boards = useSelector((state) => state.boards)

  const [isBoardModalOpen, setisBoardModalOpen] = useState(false)


  return (
    <div 
    className={isSideBarOpen ? 'h-[100vh] min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[42px] pt-10 h-screen items-center left-0 z-20' 
    : 'bg-[#635fc7] dark:bg-[#2b2c37] dark:hover:bg-[#635fc7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full'}
    >
      {
        isSideBarOpen && (
          <div className='bg-white dark:bg-[#2b2c37] w-full pt-4 rounded-xl'>
            <h3 className='dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8'>
              ALL BOARDS ({boards?.length})
            </h3>
            <div className='flex flex-col h-[70vh] justify-between'>
              <div>
                {boards.map((board , index) => (
                  <div className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  
                  ${board.isActive &&" bg-[#635fc7] rounded-r-full text-white mr-8 "} `}
                  key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.
                        setBoardActive({ index }));
                      }}
                  >
                    <img src={boardIcon} 
                    className='h-4'
                    alt="" />
                    <p
                    className='text-lg font-bold'
                    >
                      {board.name}
                    </p>
                  </div>
                ))}

                <div
                className=" flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white  "
                onClick={() => {
                  setisBoardModalOpen(true);
                }}
                >
                  <img src={boardIcon} 
                    className='h-4'
                    alt="" 
                  />
                  <p
                  className='text-lg font-bold'
                  >
                    Create New Board
                  </p>
                </div>
              </div>
              <div className=" mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                <img src={lightIcon} alt="" />
                <Switch 
                checked={darkSide}
                onChange={toggleDarkMode}
                className={`${darkSide ? 'bg-[#635fc7]': 'bg-gray-400'} relative inline-flex h-6 w-11 items-center rounded-full  border-none`}>
                    <span className={` ${darkSide ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
                </Switch>
                <img src={darkIcon} alt="" />
              </div>
            </div>
          </div>
        )
      }

      {/* Sidebar hide/show toggle */}
      {isSideBarOpen ? (
        <div
          onClick={() => setIsSideBarOpen(state => !state)}
          className=" flex  items-center absolute text-lg font-bold  rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
        >
          <img
            className=" min-w-[20px]"
            src={hideSidebarIcon}
            alt=" side bar show/hide"
          />
          {isSideBarOpen && <p> Hide Sidebar </p>}
        </div>
      ) : (
        <div className=" absolute p-5  " 
        onClick={() => setIsSideBarOpen(state => !state)}>
          <img src={showSidebarIcon} alt="showSidebarIcon" />
        </div>
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setBoardModalOpen={setisBoardModalOpen}
        />
      )}
    </div>
  )
}

export default SideBar
