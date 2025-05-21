export type JobTypeEnum =
  | "scan_path"
  | "update_existing_videos"
  | "generate_checksum"
  | "generate_thumbnail"

export type JobStatusEnum =
  | "not_started"
  | "in_progress"
  | "failed"
  | "completed"
  | "cancelled"

export type ScanPathData = {
  libraryPathId: string;
}

export type JobData =
  | ScanPathData

export type Job = {
  id: string;
  parent: string;
  jobType: JobTypeEnum;
  status: JobStatusEnum;
  priority: number;
  data: ?string;
  outcome: ?string;
  created: Date;
  modified: Date
}