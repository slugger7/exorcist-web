export enum JobTypeEnum {
  scanPath = "scan_path",
  updateExistingVideos = "update_existing_videos",
  generateChecksum = "generate_checksum",
  generateThumbnail = "generate_thumbnail"
}

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

export type Job = {
  id: string;
  jobType: JobTypeEnum;
  status: JobStatusEnum;
  data: ?string;
  outcome: ?string;
  created: Date;
  modified: Date
}