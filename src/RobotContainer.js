import { useState, useEffect } from 'react';
import Status from './components/Status';
import AuditLogs from './components/AuditLogs';

export default function RobotContainer() {
    const [auditLogs, setAuditLogs] = useState([]);

    return(
        <div className="robot-container">
            <Status setAuditLogs={setAuditLogs}/>
            <AuditLogs auditLogs={auditLogs}/>
        </div>
    )
}