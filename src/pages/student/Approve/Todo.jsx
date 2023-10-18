import React ,{useState}from 'react'
import './Approve.css'
import AddIcon from '@mui/icons-material/Add';

function Todo() {
    const [contents, setContents] = useState([]);
    const handleCreateTask = () => {
        const newContent = (
            <div className='Content' key={contents.length} style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft: '10px', }}>
                    <div>Tên task</div>
                    <div>Người làm</div>
                </div>
                <div style={{ marginRight: '20px' }}>
                    Date
                </div>
            </div>
        );

        setContents([...contents, newContent]);
    };
    return (
        <div>
            <div className='Header'>
                <div className='title'>
                    <div>Todo</div>
                    <div>0</div>
                </div>
            </div>
            <div>
                <div className='CreateTask' onClick={handleCreateTask}>
                    <div className='icon' style={{ marginRight: '10px' }}>+</div>
                    <div>Create</div>
                </div>

                {contents.map((content, index) => (
                    <div key={index}>{content}</div>
                ))}
            </div>

        </div>
    )
}

export default Todo