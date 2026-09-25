export interface GetRequestFinishTime {
  startTime: Date;
  statusHistory: {
    finishTime: Date;
  }
}