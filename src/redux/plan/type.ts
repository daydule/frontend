export type Plan = {
  id: number;
  userId: number;
  title: string;
  context: string;
  date: Date;
  startTime: string;
  end_time: string;
  processTime: number;
  travelTime: number;
  bufferTime: number;
  planType: number;
  priority: number;
  place: string;
  isScheduled: boolean;
  isRequiredPlan: boolean;
  parentPlanId: number;
  isParentPlan: boolean;
  todoStartTime: Date;
};
