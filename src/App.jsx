import { useState } from 'react';
import { Trash2, SquarePen, Check, X, SlidersHorizontal } from 'lucide-react';
import uniqid from 'uniqid';
import './App.css';

const App = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('');
  const [task, setTask] = useState([]);
  const [date, setDate] = useState('');
  const [editstatus, setEditStatus] = useState(false);
  const [deleteindex, setDeleteIndex] = useState('');
  const [deletestatus, setDeleteStatus] = useState(false);
  const [filterstatus, setFilterStatus] = useState(false);
  const [draggedtask, setDraggedTask] = useState({});
  const [editObj, setEditObj] = useState({
    val: '',
    desc: '',
    priority: '',
    date: '',
    id: '',
  });
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState('All');

  const priorityColors = {
    High: 'red',
    Medium: 'orange',
    Low: 'green',
  };
  const StatusList = ['Pending', 'Ongoing', 'Completed'];

  const onbtnclick = () => {
    if (editstatus) {
      const copylist = [...task];
      for (let i of copylist) {
        if (
          i.id === editObj.id &&
          editObj.date !== '' &&
          editObj.priority !== '' &&
          editObj.desc !== '' &&
          editObj.val !== ''
        ) {
          i.val = editObj.val;
          i.desc = editObj.desc;
          i.priority = editObj.priority;
          i.date = editObj.date;
          break;
        }
      }
      setTask(copylist);
      setEditStatus(false);
      setEditObj({ val: '', desc: '', priority: '', date: '', id: '' });
    } else {
      if (title !== '' && desc !== '' && priority !== '' && date !== '') {
        const taskObj = {
          val: title,
          desc: desc,
          status: 'Pending',
          priority: priority,
          date: date,
          id: uniqid(),
        };
        setTask([...task, taskObj]);
        setTitle('');
        setDesc('');
        setDate('');
        setPriority('');
      }
    }
  };
  const keyDown = e => {
    if (e.key === 'Enter') onbtnclick();
  };
  const onDelete = () => {
    const newTask = [...task];
    newTask.splice(deleteindex, 1);
    setTask(newTask);
    setDeleteStatus(false);
    setDeleteIndex('');
  };

  const onEdit = task => {
    setEditObj(task);
    setEditStatus(true);
  };

  const changeStatus = (id, status) => {
    const copylist = [...task];
    for (let i of copylist) {
      if (i.id === id) {
        i.status = status;
        break;
      }
    }
    setTask(copylist);
  };
  const onDropftn = status => {
    const copylist = [...task];
    for (let i of copylist) {
      if (i.id === draggedtask.id) {
        i.status = status;
        break;
      }
    }
    setTask(copylist);
    setDraggedTask({});
  };

  return (
    <div className="app">
      <div
        className="cover"
        style={{
          display:
            editstatus || deletestatus || filterstatus ? 'block' : 'none',
        }}
        onClick={() => {
          setEditStatus(false);
          setDeleteStatus(false);
          setFilterStatus(false);
        }}
      ></div>

      <div className="modal" style={{ display: editstatus ? 'block' : 'none' }}>
        <input
          type="text"
          placeholder="Add the Task"
          onChange={e => setEditObj({ ...editObj, val: e.target.value })}
          value={editObj.val}
          onKeyDown={keyDown}
        />
        <input
          type="text"
          placeholder="Add the Description"
          onChange={e => setEditObj({ ...editObj, desc: e.target.value })}
          value={editObj.desc}
          onKeyDown={keyDown}
        />
        <input
          type="date"
          placeholder="Add End Date"
          onChange={e => setEditObj({ ...editObj, date: e.target.value })}
          value={editObj.date}
          onKeyDown={keyDown}
        />
        <select
          value={editObj.priority}
          onChange={e => setEditObj({ ...editObj, priority: e.target.value })}
          onKeyDown={keyDown}
        >
          <option value="">Select</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={onbtnclick}>UPDATE</button>
      </div>
      <div
        className="delete-modal"
        style={{ display: deletestatus ? 'block' : 'none' }}
      >
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-icon">
          <Check onClick={onDelete} className="check" />
          <X
            className="uncheck"
            onClick={() => {
              setDeleteStatus(false);
            }}
          />
        </div>
      </div>
      <div
        className="filter-modal"
        style={{ display: filterstatus ? 'block' : 'none' }}
      >
        <h3>Filter By Priority</h3>
        <select
          value={selectedPriorityFilter}
          onChange={e => setSelectedPriorityFilter(e.target.value)}
          className="priority-filter-select"
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <div className="filter-btn">
          <button onClick={() => setFilterStatus(false)}>Apply Filter</button>
          <button
            onClick={() => {
              setSelectedPriorityFilter('All');
              setFilterStatus(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="task-container">
        <div className="task-header">
          <h1>Mini Task Manager</h1>
        </div>
        <div className="input-box">
          <div className="input">
            <input
              type="text"
              placeholder="Add the Task"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={keyDown}
              className="task-desc-input"
            />
            <input
              type="text"
              placeholder="Add the Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              onKeyDown={keyDown}
              className="task-desc-input"
            />
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              onKeyDown={keyDown}
              className="date-input"
            />
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              onKeyDown={keyDown}
            >
              <option value="">Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button onClick={onbtnclick}>ADD</button>
          </div>
          <SlidersHorizontal
            className="filter-icon"
            onClick={() => {
              setFilterStatus(true);
            }}
          />
        </div>

        <div className="task-list">
          {StatusList.map(status => (
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={() => {
                onDropftn(status);
              }}
            >
              <h3>{status} tasks</h3>
              {task
                .filter(
                  task =>
                    task.status === status &&
                    (selectedPriorityFilter === 'All' ||
                      task.priority === selectedPriorityFilter)
                )
                .map((task, index) => (
                  <div
                    className="list"
                    draggable="true"
                    onDragStart={() => {
                      setDraggedTask(task);
                    }}
                  >
                    <h1>{task.val}</h1>
                    <p>{task.desc}</p>
                    <p className="date-display">{task.date}</p>
                    <div className="list2">
                      <div
                        className="priority-box"
                        style={{
                          backgroundColor: priorityColors[task.priority],
                        }}
                      >
                        <p>{task.priority}</p>
                      </div>
                      <select
                        value={task.status}
                        onChange={e => changeStatus(task.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="list3">
                      <SquarePen
                        onClick={() => onEdit(task)}
                        className="icons icon1"
                      />
                      <Trash2
                        onClick={() => {
                          setDeleteIndex(index);
                          setDeleteStatus(true);
                        }}
                        className="icons icon2"
                      />
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
