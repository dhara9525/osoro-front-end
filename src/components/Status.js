import { useState, useEffect } from 'react';
import { actions } from '../constants/constants';

export default function RobotContainer({setAuditLogs}) {
    const [currentState, setCurrentState] = useState(null);
    const [processingAction, setProcessingAction] = useState(false);
    const [currentActions, setCurrentActions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/state', {})
            .then((res) => {
                res.text().then(function (text) {
                    setCurrentState(text);
                    setCurrentActions(actions.get(text))
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [currentState]);

    const handleAction = (action = null) => {
        setProcessingAction(true);
        if (action) {
            fetch('http://localhost:5000/action', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({action}),
            }).then(response => {
                setProcessingAction(false);
                if(response.status === 503) handleAction(action);
                setAuditLogs((prev) => [...prev, {
                    action: action, timestamp: new Date()
                }])
                setCurrentState(null);
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    if (!currentState) return <div>Loading Robot Status...</div>;

    if(processingAction) return <div>Action in progress..</div>;

    return (
        <div className="status">
            <div>Current status: {currentState}</div>
            <div>Actions:</div>
            {currentActions && currentActions.map(action => {
                return (
                    <div key={action}>
                        <button className="nav-button" onClick={() => handleAction(action)}>{action}</button>
                    </div>
                )
            })}
        </div>
    )
}