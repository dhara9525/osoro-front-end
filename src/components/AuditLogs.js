export default function AuditLogs({auditLogs}) {
    return (
        <>
        {!auditLogs.length && <div>No Audit Logs</div>}
        {!!auditLogs.length && auditLogs.map(log => {
            return (
                <div className="audit-logs" key={log.timestamp.getTime()}>
                    <div>
                        <span>Action: </span>
                        <span>{log.action}</span>
                    </div>
                    <div>
                        <span>Time: </span>
                        <span>{log.timestamp.getTime()}</span>
                    </div>
                </div>
            )
        })}
        </>
    )
}

