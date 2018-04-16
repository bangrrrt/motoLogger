import map from 'lodash/map';

export const updateLogEditingStatus = (logId, logs) => {
  return map(logs, (log) => {
    if (log.logId !== logId) {
      return log;
    }

    return {
      ...log,
      isEditable: !log.isEditable
    };
  });
};

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
