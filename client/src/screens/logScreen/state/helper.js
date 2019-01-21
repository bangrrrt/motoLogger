import map from 'lodash/map';

export const updateLogEditingStatus = (logId, logs, updatedLog) => (
  map(logs, (log) => {
    if (log.logId === logId || log.logId === 'newLog') {
      return {
        ...log,
        ...updatedLog,
        isEditable: !log.isEditable,
        logId
      };
    }

    return log;
  })
);

export const fetchLogHelper = fetchedLogs => (
  map(fetchedLogs, (log) => {
    if (log.isEditable) {
      return {
        ...log,
        isEditable: false
      };
    }

    return log;
  })
);
