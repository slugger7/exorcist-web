import { ScanPathData, GenerateThumbnailData, type RefreshMetadata } from "../../dto"

export type JobData =
  | ScanPathData
  | GenerateThumbnailData
  | RefreshMetadata