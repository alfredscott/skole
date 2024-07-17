"use client";
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Assignments() {
  const [createTabShown, showCreateTab] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  // Load assignments from localStorage when the component mounts
  useEffect(() => {
    const savedAssignments = localStorage.getItem('assignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  }, []);

  // Save assignments to localStorage whenever the assignments state changes
  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  function createAssignment() {
    if (taskTitle.trim() && taskDesc.trim()) {
      const newAssignment = {
        id: Date.now(), // Unique ID based on timestamp
        title: taskTitle,
        description: taskDesc,
        status: 'todo' // Initial status
      };
      setAssignments([...assignments, newAssignment]);
      setTaskTitle('');
      setTaskDesc('');
      showCreateTab(false);
    } else {
      alert('Please enter both title and description');
    }
  }

  function moveTask(id, direction) {
    setAssignments(assignments.map(assignment => {
      if (assignment.id === id) {
        if (direction === 'left') {
          if (assignment.status === 'doing') assignment.status = 'todo';
          else if (assignment.status === 'done') assignment.status = 'doing';
        } else if (direction === 'right') {
          if (assignment.status === 'todo') assignment.status = 'doing';
          else if (assignment.status === 'doing') assignment.status = 'done';
        }
      }
      return assignment;
    }));
  }

  const todoAssignments = assignments.filter(assignment => assignment.status === 'todo');
  const doingAssignments = assignments.filter(assignment => assignment.status === 'doing');
  const doneAssignments = assignments.filter(assignment => assignment.status === 'done');

  return (
    <main>
      <div className="w-full h-full mt-[4vh] pr-[2vw] text-[#292929]">
        <div className="bg-white shadow-lg w-full h-[40vw] rounded-lg p-[1.5vw] flex flex-row gap-[2vw]">
          <div id="todoContainer" className="bg-[#ECEDF1] h-full w-1/3 flex flex-col p-[1vw] rounded-lg shadow-inner">
            <div style={{ height: (createTabShown ? "16vw" : "3vw") }} className="h-[3vw] text-[1.25vw] font-[500] bg-white rounded-lg p-[0.55vw] shadow-lg duration-300 overflow-hidden">
              <div className='flex flex-row items-center justify-between px-[0.3vw] mb-[0.8vw]'>
                <div>Skal laves:</div>
                <div onClick={() => { showCreateTab(!createTabShown) }} className='bg-[#3DA1FB] rounded-[0.5vw] text-white w-[1.5vw] h-[1.5vw] hover:cursor-pointer'>
                  <Minus style={{ rotate: (createTabShown ? "0deg" : "360deg"), opacity: (createTabShown ? "100%" : "0%") }} className='absolute w-[1.5vw] h-[1.5vw] mt-[-0.04vh] duration-500' />
                  <Plus style={{ rotate: (createTabShown ? "0deg" : "360deg"), opacity: (!createTabShown ? "100%" : "0%") }} className='absolute w-[1.5vw] h-[1.5vw] mt-[-0.04vh] duration-500' />
                </div>
              </div>
              <div className='px-[0.3vw] flex flex-col gap-[0.5vw] mb-[0.8vw]'>
                <input
                  type="text"
                  id="taskTitle"
                  placeholder='Opgave navn'
                  className='text-[1vw] h-[2vw] w-full bg-[#ECEDF1] rounded-[0.3vw] shadow-inner p-[0.5vw]'
                  maxLength={20}
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <textarea
                  id="taskDesc"
                  placeholder='Opgave beskrivelse'
                  className='text-[1vw] bg-[#ECEDF1] rounded-[0.3vw] shadow-inner p-[0.5vw] h-[6.7vw] resize-none'
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                ></textarea>
              </div>
              <div className='flex flex-row px-[0.3vw] justify-between gap-[0.5vw]'>
                <div className='w-1/2 text-center bg-red-400 rounded-[0.4vw] hover:cursor-pointer' onClick={() => { setTaskTitle(''); setTaskDesc(''); showCreateTab(false); }}>Delete</div>
                <div onClick={createAssignment} className='w-1/2 text-center bg-green-300 rounded-[0.4vw] hover:cursor-pointer'>Submit</div>
              </div>
            </div>
            <div id="assignmentList" className='mt-[1vw] flex flex-col gap-[1vw] overflow-scroll rounded-lg'>
              {todoAssignments.map((assignment) => (
                <div key={assignment.id} id={`assignment${assignment.id}`} className="text-[1.25vw] font-[500] bg-white rounded-lg p-[0.9vw] shadow-lg flex flex-col justify-between">
                  <div id='titleContainer' className='flex flex-row justify-between items-center'>
                    <ChevronLeft className='w-[1.5vw] cursor-pointer' onClick={() => moveTask(assignment.id, 'left')} />
                    <div id='title'>{assignment.title}</div>
                    <ChevronRight className='w-[1.5vw] cursor-pointer' onClick={() => moveTask(assignment.id, 'right')} />
                  </div>
                  <div id='desc' className='font-[400] text-[0.9vw]'>{assignment.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div id="doingContainer" className="bg-[#ECEDF1] h-full w-1/3 flex flex-col p-[1vw] rounded-lg shadow-inner">
            <div className="h-[3vw] text-[1.25vw] font-[500] bg-white rounded-lg p-[0.5vw] shadow-lg">Laver:</div>
            <div id="assignmentList" className='mt-[1vw] flex flex-col gap-[1vw] overflow-scroll rounded-lg'>
              {doingAssignments.map((assignment) => (
                <div key={assignment.id} id={`assignment${assignment.id}`} className="text-[1.25vw] font-[500] bg-white rounded-lg p-[0.9vw] shadow-lg flex flex-col justify-between">
                  <div id='titleContainer' className='flex flex-row justify-between items-center'>
                    <ChevronLeft className='w-[1.5vw] cursor-pointer' onClick={() => moveTask(assignment.id, 'left')} />
                    <div id='title'>{assignment.title}</div>
                    <ChevronRight className='w-[1.5vw] cursor-pointer' onClick={() => moveTask(assignment.id, 'right')} />
                  </div>
                  <div id='desc' className='font-[400] text-[0.9vw]'>{assignment.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div id="doneContainer" className="bg-[#ECEDF1] h-full w-1/3 flex flex-col p-[1vw] rounded-lg shadow-inner">
            <div className="h-[3vw] text-[1.25vw] font-[500] bg-white rounded-lg p-[0.5vw] shadow-lg">Har lavet:</div>
            <div id="assignmentList" className='mt-[1vw] flex flex-col gap-[1vw] overflow-scroll rounded-lg'>
              {doneAssignments.map((assignment) => (
                <div key={assignment.id} id={`assignment${assignment.id}`} className="text-[1.25vw] font-[500] bg-white rounded-lg p-[0.9vw] shadow-lg flex flex-col justify-between">
                  <div id='titleContainer' className='flex flex-row justify-between items-center'>
                    <ChevronLeft className='w-[1.5vw] cursor-pointer' onClick={() => moveTask(assignment.id, 'left')} />
                    <div id='title'>{assignment.title}</div>
                    <ChevronRight className='w-[1.5vw] cursor-pointer' onClick={() => moveTask(assignment.id, 'right')} />
                  </div>
                  <div id='desc' className='font-[400] text-[0.9vw]'>{assignment.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
