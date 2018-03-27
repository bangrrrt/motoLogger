import map from 'lodash/map';

export const updateLogEditingStatus = (logId, logs) => {
  return map(logs, log => {
    if(log.logId !== logId) {
      return log;
    }

    return {
      ...log,
      isEditable: !log.isEditable
    };
  });
};
