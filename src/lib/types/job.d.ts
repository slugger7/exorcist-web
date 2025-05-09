export type JobTypeEnum = 
  |"scan_path"
  |"update_existing_videos"
  |"generate_checksum"
  |"generate_thumbnail"
  
export enum JobStatusEnum {
  notStarted = "not_started",
  inProgress = "in_progress",
  failed = "failed",
  completed = "completed",
  cancelled = "cancelled"
}

export type ScanPathData = {
  libraryPathId: string;
}

export type JobData = 
  | ScanPathData

export type Job = {
  id: string;
  jobType: JobTypeEnum;
  status: JobStatusEnum;
  data: ?string;
  outcome: ?string;
  created: Date;
  modified: Date
}